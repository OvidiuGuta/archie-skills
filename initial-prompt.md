I want to build an agenting workflow based on skills that models the way I like to work with AI. It will be heavily inspired by https://github.com/mattpocock/skills, which you have installed and can work with, but customized for my preferences. This system will eventually replace mattpocock/skills.

The worflow three phases:
1. Setup
2. Planning - HITL
3. Implementing - AFK

Phases 2 and 3 can repeat an arbitrary amount of times

# Phase 1 - Setup

This phase needs one skill that walks the user through setting up the repo.

Just like mattpocock/skills, we need to run a setup phase in a repo to make sure everything is ready.

What I don't want from mattpocock/skills/setup-mattpocock-skills:
- No issue tracker stuff, only local
- No multi-context repo. I want single context and single ADR folder.
- Triage labels. Lables as such are good, but let's keep only ready-for-agent and ready-for-human for now. What we need on top is task statuses (todo, in-progress, ready-for review, done).

# Phase 2 - Planning

This phase is where the user and the agent work together to reach a common understanding of what needs to be done. 
For this, I don't like wayfinder. It's too waterfallish. Too much planning with no results to show for it. What I want is a more agile approach, where the the user scopes the work in a session with the agent. 

I call this /architect (verb). If the work is too large and/or too high level, we create a roadmap (instead of a map) and roadmap items that are separate /architect sessions for the user and the agent to dive deeper into. For reatching common understanding, we need grilling and domain-modeling just like mattpocock/skills has but adapted to our needs.

Grilling (which we are going to cal interviewing) should be one question at a time, as it was in the old version of mattpocock-skill

At the end of a /architecting session, if the level is low enough, the user runs /to-spec and /to-taks to produce the working tasks for phase 3.

Notice that /architect can go an arbitrary amount of levels deep, but it's the users that ultimately needs to make the call if it goes a level deeper of it detailed enough to start working.

Where the agile part comes in? well, the roadmap-items need to be built sequentially, if the first one is built already, when /architect-in the second one, the current state influences decesions.

One more thing. After all the items on the roadmap are done, the roadmap can be closed. Maybe roadmap is not a good term. what is higher than an epic in agile terms? 

# Phase 3: Implementing

Here we need a skill called /implement that receives a ticket url and a set of sub-skills for each implementation subphase.

The process for /implement is as follows:

1. the agent is the "orchestrator"
2. He looks at the ticket and the spec so he understands what needs to be implemented.
3. He hands-over to a read-only "software-architect" sub-agent that defines and designes how to implement the task in the codebase, how to structure the modules, libraries, components etc. He will use the /software-architecture skill. The sub-agent then hands back his desing to the orchestrator.
4. The orchestrator spawns an engineer agent handing him the spec, the ticket and the design from the software-architect. The agent uses the /tdd skill to implement the task and reports back to the orchestrator.
5. After implementation is done, the orchestrator fires a "code-reviewer" agent that uses the /code-review to check the code and that the code adheres to the spec and ticket and hands back he's finings to the orchestrator
6. Orchestrator evaluates the findings, decides if the finings need fixing and spawns the engineer again to fix them. This can go on for two rounds at most.
7. After code-review and fixing is complete, the orchestrator kicks off a "qa" sub-agent that checks the acceptance criteria against the real app (by writing automated tests and/or using the real app) using the /qa skill
9. With Qa's finding in hand, the orchestrator presents a summary to the user of what has been done

We need to write all the skills even if they have an equivalent in mattpocock/skills because like I said, the point is to replace mattpocock/skills with our set. Also, we need to define which of the skill are user calleble only.

At the end I also want to document everything in the readme file.
