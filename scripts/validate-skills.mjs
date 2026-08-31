#!/usr/bin/env node
// Structural gate over the skill bundle. Run from the repo root:
//
//   node scripts/validate-skills.mjs
//
// Exits non-zero on any failure, printing one line per failure naming the file
// and the problem. See README.md for what it checks and why some checks are
// warnings while the bundle is still being built.
//
// Each skill directory is authored self-contained: it owns whatever reference
// files it needs, and nothing is generated or shared. The check that keeps that
// true is the one below forbidding a link out of a skill's own directory.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, relative, resolve } from 'node:path'

const ROOT = process.cwd()
const SKILLS_DIR = join(ROOT, 'skills')
const README = join(ROOT, 'README.md')
const MARKETPLACE = join(ROOT, '.claude-plugin', 'marketplace.json')

/** The twelve skills of the spec, split by who may invoke them. */
const ENTRY_SKILLS = [
  'archie-setup',
  'archie-architect',
  'archie-to-spec',
  'archie-to-tasks',
  'archie-implement',
  'archie-assist',
]
const SUB_SKILLS = [
  'archie-interview',
  'archie-domain-modeling',
  'archie-research',
  'archie-prototype',
  'archie-tdd',
  'archie-code-review',
]
const ROSTER = new Set([...ENTRY_SKILLS, ...SUB_SKILLS])

const failures = []
const warnings = []
const fail = (file, problem) => failures.push(`${rel(file)}: ${problem}`)
const warn = (file, problem) => warnings.push(`${rel(file)}: ${problem}`)
const rel = (file) => relative(ROOT, file) || '.'

// --- tiny YAML reader -------------------------------------------------------
// Frontmatter and openai.yaml are flat or two-level `key: value` maps. That is
// the whole grammar the bundle uses, so it is the whole grammar parsed here.
// Anything more nested is a signal the file drifted from the convention.

function parseYaml(text) {
  const map = {}
  let parent = null
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+$/, '')
    if (!line || /^\s*#/.test(line)) continue
    const match = /^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!match) continue
    const [, indent, key, rawValue] = match
    const value = unquote(rawValue)
    if (indent.length === 0) {
      parent = value === '' ? (map[key] = {}) : null
      if (value !== '') map[key] = value
    } else if (parent) {
      parent[key] = value
    }
  }
  return map
}

const unquote = (value) => value.replace(/^(['"])(.*)\1$/, '$2').trim()

/** Splits `---`-delimited frontmatter off a markdown body. */
function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!match) return { frontmatter: null, body: text }
  return { frontmatter: parseYaml(match[1]), body: text.slice(match[0].length) }
}

// --- body scanning ----------------------------------------------------------

const SKILL_REF = /(^|[^\w./-])\/([a-z][a-z0-9-]*[a-z0-9])(?![\w./-])/g
const MD_LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

const skillRefsIn = (body) => [...body.matchAll(SKILL_REF)].map((m) => m[2])

/** Relative link targets only: external, absolute and anchor-only links are not ours to check. */
function relativeLinksIn(body) {
  return [...body.matchAll(MD_LINK)]
    .map((m) => m[1])
    .filter((href) => !/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(href))
    .map((href) => href.split('#')[0])
    .filter(Boolean)
}

const listDirs = (dir) =>
  existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()) : []

function walkFiles(dir, predicate) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return walkFiles(path, predicate)
    return predicate(path) ? [path] : []
  })
}

// --- the bundle -------------------------------------------------------------

if (!existsSync(SKILLS_DIR)) {
  console.error(`skills/: directory not found — run this from the repo root`)
  process.exit(1)
}

const skillDirs = listDirs(SKILLS_DIR).map((e) => join(SKILLS_DIR, e.name))

const presentSkills = new Set(skillDirs.map((dir) => dir.split('/').pop()))
const readmeText = existsSync(README) ? readFileSync(README, 'utf8') : ''
if (!readmeText) fail(README, 'missing — every skill has to be documented here')

// --- per-skill checks -------------------------------------------------------

for (const dir of skillDirs) {
  const dirName = dir.split('/').pop()
  const skillFile = join(dir, 'SKILL.md')

  if (!existsSync(skillFile)) {
    fail(skillFile, 'missing — every skill directory needs a SKILL.md')
    continue
  }

  // A missing frontmatter block is one failure, not a reason to stop checking
  // the rest of the skill — the run should report everything to fix at once.
  const parsed = splitFrontmatter(readFileSync(skillFile, 'utf8'))
  if (!parsed.frontmatter) fail(skillFile, 'no `---` frontmatter block')
  const frontmatter = parsed.frontmatter ?? {}
  const body = parsed.body

  const name = typeof frontmatter.name === 'string' ? frontmatter.name : ''
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : ''
  if (parsed.frontmatter && !name) fail(skillFile, 'frontmatter has no `name`')
  if (parsed.frontmatter && !description) fail(skillFile, 'frontmatter has no `description`')
  if (name && name !== dirName) {
    fail(skillFile, `frontmatter name \`${name}\` does not match its directory \`${dirName}\``)
  }

  // Invocability: the six entry skills are user-callable only, the six
  // sub-skills are reachable by naming them and must not be disabled.
  const disabled = String(frontmatter['disable-model-invocation']).toLowerCase() === 'true'
  if (!ROSTER.has(dirName)) {
    fail(skillFile, `\`${dirName}\` is not one of the twelve skills in the spec`)
  } else if (ENTRY_SKILLS.includes(dirName) && !disabled) {
    fail(skillFile, 'entry skill is missing `disable-model-invocation: true`')
  } else if (SUB_SKILLS.includes(dirName) && disabled) {
    fail(skillFile, 'sub-skill must not carry `disable-model-invocation: true`')
  }

  // agents/openai.yaml, for parity with the bundle this one replaces.
  const openaiFile = join(dir, 'agents', 'openai.yaml')
  if (!existsSync(openaiFile)) {
    fail(openaiFile, 'missing — every skill ships an `agents/openai.yaml`')
  } else {
    const yaml = parseYaml(readFileSync(openaiFile, 'utf8'))
    const iface = yaml.interface && typeof yaml.interface === 'object' ? yaml.interface : yaml
    if (!iface.display_name) fail(openaiFile, 'no `display_name`')
    if (!iface.short_description) fail(openaiFile, 'no `short_description`')
  }

  // Every skill is documented in the README, by the ticket that built it.
  const documented =
    skillRefsIn(readmeText).includes(dirName) || readmeText.includes(`skills/${dirName}/`)
  if (!documented) fail(README, `skill \`/${dirName}\` is not documented in the README`)

  // Skill references in the body resolve to a skill in the bundle. A reference
  // to a rostered skill that is not built yet is a warning, so the gate stays
  // usable while the bundle is being assembled ticket by ticket.
  for (const ref of new Set(skillRefsIn(body))) {
    if (presentSkills.has(ref)) continue
    if (ROSTER.has(ref)) warn(skillFile, `references \`/${ref}\`, which is not built yet`)
    else fail(skillFile, `references \`/${ref}\`, which is not a skill in the bundle`)
  }

  // Independence: skills.sh installs one skill directory at a time, so a link
  // leaving the skill's own directory is dead the moment the bundle lands.
  for (const target of relativeLinksIn(body)) {
    if (target.startsWith('../')) fail(skillFile, `link \`${target}\` leaves the skill's own directory`)
  }
}

// --- link checks across every markdown file in the bundle -------------------
// A skill's own reference files cross-link and rot the same way as its
// SKILL.md, so they are checked on the same pass.

const linkedFiles = [...walkFiles(SKILLS_DIR, (p) => p.endsWith('.md')), README].filter(existsSync)

for (const file of linkedFiles) {
  const { body } = splitFrontmatter(readFileSync(file, 'utf8'))
  for (const target of new Set(relativeLinksIn(body))) {
    const resolved = resolve(dirname(file), target)
    if (!existsSync(resolved)) fail(file, `link \`${target}\` points at a file that does not exist`)
  }

  // Outside a SKILL.md there is no bundle position to resolve against, so a
  // skill reference is checked against the roster instead.
  if (file.endsWith('SKILL.md')) continue
  for (const ref of new Set(skillRefsIn(body))) {
    if (!ROSTER.has(ref)) fail(file, `references \`/${ref}\`, which is not a skill in the bundle`)
  }
}

// --- the phase manifest -----------------------------------------------------
// `.claude-plugin/marketplace.json` groups the skills into Archie's two phases
// in the skills.sh picker. Two lists of skills drift, so they are compared.

if (!existsSync(MARKETPLACE)) {
  fail(MARKETPLACE, 'missing — the phase groups in the installer come from here')
} else {
  let manifest = null
  try {
    manifest = JSON.parse(readFileSync(MARKETPLACE, 'utf8'))
  } catch (error) {
    fail(MARKETPLACE, `invalid JSON: ${error.message}`)
  }

  if (manifest) {
    const grouped = new Map()
    for (const plugin of manifest.plugins ?? []) {
      if (!plugin.name) fail(MARKETPLACE, 'a plugin entry has no `name`, so its skills land ungrouped')
      for (const path of plugin.skills ?? []) {
        // The CLI silently drops any path not starting with `./`.
        if (!path.startsWith('./')) {
          fail(MARKETPLACE, `skill path \`${path}\` does not start with \`./\` and is ignored`)
          continue
        }
        const name = path.replace(/^\.\/skills\//, '')
        if (grouped.has(name)) fail(MARKETPLACE, `\`${name}\` is listed in two phases`)
        grouped.set(name, plugin.name)
        if (!presentSkills.has(name)) fail(MARKETPLACE, `lists \`${name}\`, which is not a skill in the bundle`)
      }
    }
    for (const name of presentSkills) {
      if (!grouped.has(name)) fail(MARKETPLACE, `\`${name}\` is in no phase, so it lands under "Other"`)
    }
  }
}

// --- report -----------------------------------------------------------------

const missing = [...ROSTER].filter((name) => !presentSkills.has(name))
const ownReferenceFiles = walkFiles(SKILLS_DIR, (p) => p.endsWith('.md') && !p.endsWith('SKILL.md'))
console.log(`skills: ${presentSkills.size}/${ROSTER.size} present, ${ownReferenceFiles.length} skill-owned reference files`)
if (missing.length) console.log(`not built yet: ${missing.map((n) => `/${n}`).join(', ')}`)

for (const warning of warnings) console.log(`warn  ${warning}`)
for (const failure of failures) console.error(`FAIL  ${failure}`)

if (failures.length) {
  console.error(`\n${failures.length} failure${failures.length === 1 ? '' : 's'}`)
  process.exit(1)
}
console.log(warnings.length ? `\nok, with ${warnings.length} warnings` : '\nok')
