---
name: release-develop-to-main
description: Release the current `origin/develop` state to `main` in this repository. Use when Codex needs to create a `release/YYYY-MM-DD.N` branch from `origin/develop`, push it, open a GitHub pull request targeting `main`, and confirm that merging to `main` will trigger the existing GitHub Pages deployment workflow.
---

# Release Develop To Main

Use this skill only for this repository's release flow.

The repository already deploys GitHub Pages from pushes to `main` via `.github/workflows/deploy-pages.yml`. This skill handles the missing release orchestration layer:

- branch source: `origin/develop`
- branch target: `main`
- release branch name: `release/YYYY-MM-DD.N`
- PR target: `main`

## Required Checks

Before creating a release:

1. Read `.github/workflows/deploy-pages.yml` and confirm that `push` to `main` triggers the Pages build and deploy.
2. Treat `origin/develop` as the source of truth. Do not release from the current branch or from the local `develop` branch unless it exactly matches `origin/develop`.
3. If the working tree has unrelated local changes, leave them untouched. The release must still branch from `origin/develop`.

## Workflow

1. Fetch `origin/develop` and `origin/main`.
2. Verify whether `origin/develop` is ahead of `origin/main`.
3. Run the bundled script:

```bash
bash .codex/skills/release-develop-to-main/scripts/release-from-develop.sh --dry-run
```

4. For the real release, run:

```bash
bash .codex/skills/release-develop-to-main/scripts/release-from-develop.sh
```

5. Report:
   - created release branch
   - source commit from `origin/develop`
   - PR URL
   - confirmation that merging the PR to `main` will trigger the GitHub Pages deploy workflow

## Safety Rules

- Never base the release on the currently checked out feature branch.
- Never merge directly to `main` without a PR.
- If `origin/develop` has no changes relative to `origin/main`, stop and say there is nothing to release.
- If `gh` authentication is missing or push/PR creation fails, report the blocker clearly.

## Completion Criteria

Finish only when all are true:

- a new `release/YYYY-MM-DD.N` branch exists from `origin/develop`
- the branch is pushed to `origin`
- a PR to `main` exists
- the final response includes the PR URL and the deployment trigger note
