#!/usr/bin/env node
/**
 * Publish this folder to GitHub without using git.
 *
 * Why this exists: git and python3 on this Mac are gated behind an unaccepted
 * Xcode licence (`sudo xcodebuild -license`), which also blocks Homebrew from
 * installing its own git. This script talks to the GitHub Contents API through
 * the `gh` CLI instead, which is a standalone Go binary and unaffected.
 *
 *   node publish.js               publish the default file list
 *   node publish.js index.html    publish just these files
 *
 * Requires: gh (authenticated — check with `gh auth status`).
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO = "creightonjames-jpg/game-plan-board";
const DIR = __dirname;
const DEFAULT_FILES = ["index.html", "README.md"];
const TAG = "\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>";

const gh = (args, input) =>
  execFileSync("gh", args, { input, encoding: "utf8", maxBuffer: 1 << 28 });

function remoteSha(file) {
  try {
    return JSON.parse(gh(["api", `repos/${REPO}/contents/${file}`])).sha;
  } catch {
    return null; // not on the remote yet
  }
}

function publish(file, message) {
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) {
    console.error(`  missing  ${file} — skipped`);
    return false;
  }
  const local = fs.readFileSync(full);
  const sha = remoteSha(file);

  // Skip files that are already identical on the remote.
  if (sha) {
    const header = Buffer.from(`blob ${local.length}\0`);
    const crypto = require("crypto");
    const blob = crypto.createHash("sha1")
      .update(Buffer.concat([header, local])).digest("hex");
    if (blob === sha) {
      console.log(`  unchanged  ${file}`);
      return false;
    }
  }

  const body = { message: message + TAG, content: local.toString("base64") };
  if (sha) body.sha = sha;
  const res = JSON.parse(gh(
    ["api", "--method", "PUT", `repos/${REPO}/contents/${file}`, "--input", "-"],
    JSON.stringify(body)));
  console.log(`  ${sha ? "updated" : "created"}  ${file}  ${res.commit.sha.slice(0, 7)}`);
  return true;
}

function remove(file, message) {
  const sha = remoteSha(file);
  if (!sha) return false;
  const res = JSON.parse(gh(
    ["api", "--method", "DELETE", `repos/${REPO}/contents/${file}`, "--input", "-"],
    JSON.stringify({ message: message + TAG, sha })));
  console.log(`  deleted  ${file}  ${res.commit.sha.slice(0, 7)}`);
  return true;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const files = args.length ? args : DEFAULT_FILES;
  const msg = process.env.MSG || "Update " + files.join(", ");
  console.log(`publishing to ${REPO}`);
  let n = 0;
  for (const f of files) if (publish(f, msg)) n++;
  console.log(n ? `\n${n} file(s) published.` : "\nNothing to publish — remote already matches.");
  console.log(`https://creightonjames-jpg.github.io/game-plan-board/`);
}

module.exports = { publish, remove, remoteSha };
