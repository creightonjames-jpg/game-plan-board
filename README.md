# Club Game Plans

**Live: https://creightonjames-jpg.github.io/game-plan-board/**

A tool for a regional director tracking club game plans — the thing a OneNote
page-per-meeting can't do. Seven clubs in one portfolio, 243 items.

One of them is real.

| Club | Data |
|---|---|
| **Balcones Country Club** | **Real** — the club's actual 2026 membership game plan, 152 items imported from `2026 Game Plan.docx` |
| Cedar Ridge, Harbor Bluff, Wexford Hills, Palmetto Trace, Thornwood, Silver Creek | Invented demo data, to show the portfolio rollup across several clubs |

The Balcones plan carries real staff first names and real club strategy. It contains
**no member data and no financial figures**. Every other club in the app is fictional
and is labelled `DEMO` in the interface.

## The problem

Regional support tracks each club's game plan as a document per meeting: a nested list
of checkboxes copy-pasted forward each time. That structure collapses three different
things into one:

- **tasks** — "update the collateral packets"
- **decisions** — "extending the preview through October, dues start moves to 1/1/27"
- **open questions** — "how does membership get the guest list each week?"

They all render as identical checkboxes, so a decision already made looks the same as
a task nobody has started. Owners and due dates only exist as prose inside the item
title, if at all. Each meeting is a new page, so there is no history of an item and no
way to see across clubs at once.

## What this does instead

**One living game plan per club, with meetings as checkpoints over it.** That flip is
most of the value.

- **Append-only history.** You never edit an item's title to record what happened — you
  add a dated note under it, attributed to whoever said it.
- **Three item kinds**, drawn differently: task, decision, question.
- **Owner, due date, status, age and carry-over count** on every item.
- **Stall detection** — anything tracked and untouched for 30+ days is flagged.
- **Portfolio rollup** across all seven clubs, with a per-club closure-rate chart.
- **Review mode** — scoped to what needs a decision now, with one-tap status.
- **Generated recap** — decisions, closures, new commitments, what's still silent, open
  questions, what's due next. Copy as text into the follow-up email. Nothing retyped.
- **Search** across every club, item and note body.

## What the real import showed

Running an actual plan through it surfaced structure the invented clubs never had:

**The document has two tracks, not one.** A standing *program* plan (New Members,
Ambassador Council, Invitation, Sponsor Recognition, Other — nested three levels deep)
and a separate *month-by-month calendar* for all of 2026. Balcones shows both; the demo
clubs only have the first.

**The document records no status of any kind.** All 152 Balcones items import as
`Not recorded` — the true state of the plan, not a placeholder. That is the finding:
29 items are past a date the plan itself set, and nothing anywhere says whether they
happened. Statuses were deliberately not guessed.

**The document contradicts itself in four places**, none of which Word can flag:

- The Ambassador kickoff is scheduled 2/25 in February and 3/4 in March.
- May's list says "Send invite for June Member Appreciation on 3/31" — a March date.
- September's "State of Membership our" is truncated mid-word.

Obvious typos were normalised on import ("Video of Incitation" → "Video of
invitation"); every substantive line is kept verbatim.

## Running it

Single self-contained HTML file, no build step and no dependencies:

```
open index.html
```

The only network request is the Google Fonts stylesheet.

## Publishing

`git` on the development Mac is blocked by an unaccepted Xcode licence
(`sudo xcodebuild -license`), which also stops Homebrew from installing its own git. So
publishing goes through the GitHub Contents API instead:

```
node publish.js
```

That needs only the `gh` CLI, which is a standalone binary and unaffected. It skips
files already identical on the remote and prints the resulting commits.

## Limits

- **State is per-browser** (`localStorage`). Each visitor gets their own copy of the
  seeded data; nothing is shared between people or devices. Real shared storage is a
  separate build.
- **GM access is out of scope by design.** GMs are named as item owners and receive the
  generated recap; they do not log in. There is no auth layer.
- **Adding an item uses browser prompts**, a deliberate prototype shortcut.
- **No note parsing yet.** Pasting raw meeting notes and having them split into items,
  decisions and questions with owners inferred is the next thing worth building.

*Reset all data* in the sidebar restores all seven plans as imported.
