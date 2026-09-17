# Game Plan Board

A prototype for tracking club game plans across a regional portfolio — the thing a
OneNote page-per-meeting can't do.

## Two builds in this repo

| File | Data | Purpose |
|---|---|---|
| `index.html` | **Fictional** — six invented clubs | The demo. Shows the multi-club portfolio rollup. |
| `bcc-2026.html` | **Real** — BCC's 2026 membership game plan | The working import of an actual club plan. |

`index.html` contains no real club, member or employee information.

`bcc-2026.html` is built from a real Word document (`2026 Game Plan.docx`, 152 items)
and contains real staff first names and real club strategy. It carries **no member
data and no financial figures**. It is published here as a worked example of the import.

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

## What the real import showed

Running an actual plan through it surfaced structure the fictional demo never had:

**The document has two tracks, not one.** A standing *program* plan (New Members,
Ambassador Council, Invitation, Sponsor Recognition, Other — nested three levels deep)
and a separate *month-by-month calendar* for all of 2026. The board models both.

**The document records no status of any kind.** All 152 items import as
`Not recorded` — which is the true state of the plan, not a placeholder. That is the
finding, not a gap in the import: 29 items are past a date the plan itself set, and
nothing anywhere says whether they happened.

**The document contradicts itself in four places**, none of which Word can flag:

- The Ambassador kickoff meeting is scheduled 2/25 in February and 3/4 in March.
- May's list says "Send invite for June Member Appreciation on 3/31" — a March date.
- September's "State of Membership our" is truncated mid-word.

These are surfaced on the overview as *Contradictions inside the document*.

Obvious typos were normalised on import (e.g. "Video of Incitation" → "Video of
invitation"); every substantive line is kept verbatim.
