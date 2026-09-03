# Game Plan Board

A prototype for tracking club game plans across a regional portfolio — the thing a
OneNote page-per-meeting can't do.

**All clubs, people and data in this repo are fictional.** No real club, member or
employee information appears anywhere in it.

## The problem

Regional support tracks each club's game plan as a OneNote page per meeting: a nested
list of checkboxes copy-pasted forward each time. That structure collapses three
different things into one:

- **tasks** — "update the collateral packets"
- **decisions** — "extending the preview through October, dues start moves to 1/1/27"
- **open questions** — "how does membership get the guest list each week?"

They all render as identical checkboxes, so a decision already made looks the same as
a task nobody has started. Owners and due dates only exist as prose inside the item
title, if at all. And because each meeting is a new page, there is no history of an
item and no way to see across clubs at once.

## What this does instead

**One living game plan per club, with meetings as checkpoints over it.** That flip is
most of the value.

- **Append-only history.** You never edit an item's title to record what happened —
  you add a dated note under it. The item's whole life is visible in one place.
- **Three item kinds**, drawn differently: task, decision, question.
- **Owner, due date, status, age, carry-over count** on every item. "Carried through
  3 meetings" is the number that doesn't exist in OneNote.
- **Stall detection** — anything open and untouched for 30+ days is flagged.
- **Portfolio rollup** across every club: open, overdue, stalled, closed in 30 days,
  plus a per-club closure-rate chart.
- **Meeting mode** — open items sorted by what's hurting, one-tap status, quick note
  per line, attributed to whoever said it.
- **Generated recap** — decisions, closures, new commitments, parked items, what's
  still silent, open questions, what's due next. Copy as text into the follow-up
  email. Nothing retyped.
- **Search** across every club, item and note body.

## Running it

Single self-contained HTML file, no build step and no dependencies:

```
open index.html
```

Everything is vanilla JS. The only network request is the Google Fonts stylesheet.

## Scope and limits

- **Regional support only.** GMs do not have access; they are named as item owners and
  receive the generated recap. There is no login and no permissions layer.
- **State is per-browser** (`localStorage`). Each person who opens it gets their own
  copy of the seeded data. Sharing one dataset across several regional directors would
  need real shared storage — a separate build.
- **Adding an item uses browser prompts**, a deliberate prototype shortcut.
- **No note parsing yet.** Pasting raw meeting notes and having them split into items,
  decisions and questions with owners inferred is the next thing worth building.

*Reset demo data* in the sidebar restores the seeded fictional portfolio at any time.
