# AI PRD · Juno

## Problem & user

_The user problem and who has it._

_____
# Harness Sketch

Describe Juno's role and task: Juno assigns reach and impact score to workflows based on customer feedback in online forums

_Rough first pass, Module 3 Lab 1. Not the AI PRD._

## 01 · Context
the raw signals, the sales pipeline snapshot, and product strategy one pager so it has customer and business value context

## 02 · Tools
it can assign a score of 1 to 5 for reach and for impact for each of the given workflows.

## 03 · Loop
one pass per signal

## 04 · Memory
a summary of customer sentiment. if human edits the suggested score, capture and store the change.

## 05 · Permissions
it can draft and post reach and impact scores. it can't change the workflows.

## 06 · Verification
the PM will verify and approve.


## The harness

| Surface | Specification |
|---|---|
| 01 Context | _what Juno gets to see_ |
| 02 Tools | _the verb list_ |
| 03 Loop | _turn ceiling and escalation_ |
| 04 Memory | _what persists, at what scope_ |
| 05 Permissions | _read … · draft … · write … · send …_ |
| 06 Verification | _the check before output ships_ |

## 01 Context · Data Requirements

- **Required sources:** _name actual systems and documents, not "internal docs."_
- **Deliberate exclusions:** _what you left out, and why._
- **SLA of truth:** _how fast a change in a source becomes a change in the answer._
- **When a source is unreachable:** _fail loudly, or degrade how?_

## 02 Tools · System Capabilities

- **The verb list:** _every function Juno may call, with its side-effect class (read / draft / write / send)._
- **Deliberate omissions:** _the tools you did not build, and why. Name at least one._

## 03 Loop · AI Costs & Latency

- **Turn ceiling:** _e.g. 5 turns per request._
- **Escalation trigger:** _what makes it stop and hand back to a human._
- **Latency and cost target:** _e.g. p95 under 8s, under $0.12 per task._

## 04 Memory · Data Requirements

- **What persists, at what scope:** _turn, session, user, or team._
- **Expiry:** _TTL per fact._
- **Write rules:** _who outranks the model when a human disagrees._

## 05 Permissions · AI Risks & Mitigations

| Side-effect class | Tier |
|---|---|
| read | _auto / confirm / blocked_ |
| draft | _auto / confirm / blocked_ |
| write | _auto / confirm / blocked_ |
| send | _auto / confirm / blocked_ |

**Justification:** _blast radius and recoverability for each non-obvious tier._

## 06 Verification · AI Testing & Measurement

- **The check before output ships:** _what is checked, against what bar._
- **Failure behaviour:** _what happens when the check fails. Silently dropping the output is never the answer._

## Eval plan

_Stub. Module 5 fills this in: the human eval rubric in `05-evals/human-rubric.md`, with its pass bar._

## Out of scope

_Any capability not in the verb list, and any action tiered `blocked`. Both are decisions on the record, not omissions._
