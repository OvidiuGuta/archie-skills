#!/usr/bin/env node
// Fans the authored reference set out into each skill's own `references/` folder.
// Run from the repo root:
//
//   node scripts/sync-references.mjs           rewrite the copies
//   node scripts/sync-references.mjs --check    change nothing, exit 1 on drift
//
// `reference/` is the single authored source and is never installed. skills.sh
// copies one skill directory at a time, so a skill that read `../reference/`
// would arrive with dangling links; each skill therefore ships its own copies.
// Edit `reference/`, never `skills/*/references/`.
//
// A skill's copies are the transitive closure of what its SKILL.md links, because
// the reference files link each other: a skill that needs `altitude.md` also needs
// the `decisions.md` that `altitude.md` points at.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname, relative, posix } from 'node:path'

const ROOT = process.cwd()
const SOURCE_DIR = join(ROOT, 'reference')
const SKILLS_DIR = join(ROOT, 'skills')
const COPY_DIR_NAME = 'references'
const CHECK = process.argv.includes('--check')

const problems = []

// --- the authored source ----------------------------------------------------

/** Every reference file, keyed by its path relative to `reference/`. */
function readSource(dir = SOURCE_DIR, prefix = '') {
  const files = new Map()
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const key = prefix ? posix.join(prefix, entry.name) : entry.name
    if (entry.isDirectory()) {
      for (const [k, v] of readSource(join(dir, entry.name), key)) files.set(k, v)
    } else if (entry.name.endsWith('.md')) {
      files.set(key, readFileSync(join(dir, entry.name), 'utf8'))
    }
  }
  return files
}

const source = readSource()

/** Markdown link targets, minus anchors and external URLs. */
const linkTargets = (text) =>
  [...text.matchAll(/\]\(([^)\s]+)\)/g)]
    .map(([, target]) => target.split('#')[0])
    .filter((target) => target && !/^[a-z][a-z0-9+.-]*:/i.test(target))

/**
 * Reference files link each other with paths relative to their own location, so
 * resolve each link against the linking file's directory to get a source key.
 */
function sourceEdges(key, text) {
  const base = posix.dirname(key)
  return linkTargets(text)
    .map((target) => posix.normalize(posix.join(base, target)))
    .filter((resolved) => source.has(resolved))
}

// Any link inside the source set that escapes it is a bug: the copies are
// installed alone, so a link out of the reference set is dead on arrival.
for (const [key, text] of source) {
  const base = posix.dirname(key)
  for (const target of linkTargets(text)) {
    const resolved = posix.normalize(posix.join(base, target))
    if (!source.has(resolved)) {
      problems.push(`reference/${key}: link "${target}" leaves the reference set`)
    }
  }
}

// --- what each skill needs -------------------------------------------------

const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()

/** The closure of reference files a skill's SKILL.md pulls in. */
function requiredFor(skillName) {
  const skillMd = join(SKILLS_DIR, skillName, 'SKILL.md')
  if (!existsSync(skillMd)) return new Set()

  const direct = linkTargets(readFileSync(skillMd, 'utf8'))
    .filter((target) => target.startsWith(`./${COPY_DIR_NAME}/`))
    .map((target) => target.slice(`./${COPY_DIR_NAME}/`.length))

  const closure = new Set()
  const queue = [...direct]
  while (queue.length) {
    const key = queue.pop()
    if (closure.has(key)) continue
    if (!source.has(key)) {
      problems.push(`skills/${skillName}/SKILL.md: no reference file "${key}"`)
      continue
    }
    closure.add(key)
    queue.push(...sourceEdges(key, source.get(key)))
  }
  return closure
}

// --- write, or check ------------------------------------------------------

let written = 0
let checked = 0

for (const skillName of skillDirs) {
  const required = requiredFor(skillName)
  const copyDir = join(SKILLS_DIR, skillName, COPY_DIR_NAME)

  const present = existsSync(copyDir) ? [...collect(copyDir)] : []
  const stale = present.filter((key) => !required.has(key))

  if (CHECK) {
    for (const key of stale) problems.push(`skills/${skillName}/${COPY_DIR_NAME}/${key}: nothing links it`)
    for (const key of required) {
      const path = join(copyDir, key)
      if (!existsSync(path)) {
        problems.push(`skills/${skillName}/${COPY_DIR_NAME}/${key}: missing, run scripts/sync-references.mjs`)
      } else if (readFileSync(path, 'utf8') !== source.get(key)) {
        problems.push(`skills/${skillName}/${COPY_DIR_NAME}/${key}: differs from reference/${key}`)
      }
      checked++
    }
    continue
  }

  for (const key of stale) rmSync(join(copyDir, key))
  for (const key of required) {
    const path = join(copyDir, key)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, source.get(key))
    written++
  }
  if (required.size === 0 && existsSync(copyDir)) rmSync(copyDir, { recursive: true })
}

/** Copy keys present on disk under a skill's `references/`. */
function* collect(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const key = prefix ? posix.join(prefix, entry.name) : entry.name
    if (entry.isDirectory()) yield* collect(join(dir, entry.name), key)
    else yield key
  }
}

if (problems.length) {
  for (const problem of problems) console.error(problem)
  console.error(`\n${problems.length} problem(s).`)
  process.exit(1)
}

console.log(
  CHECK
    ? `${checked} reference copies across ${skillDirs.length} skills are in sync.`
    : `Wrote ${written} reference copies across ${skillDirs.length} skills.`
)
