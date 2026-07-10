#!/usr/bin/env bash

set -euo pipefail

dry_run=false
fetch_remote=true
allow_dirty=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      dry_run=true
      shift
      ;;
    --no-fetch)
      fetch_remote=false
      shift
      ;;
    --allow-dirty)
      allow_dirty=true
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command git
require_command gh

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ "$allow_dirty" != true && -n "$(git status --porcelain)" ]]; then
  echo "Working tree must be clean before creating a release branch." >&2
  exit 1
fi

if [[ "$fetch_remote" == true ]]; then
  git fetch origin develop main --prune
fi

if ! git show-ref --verify --quiet refs/remotes/origin/develop; then
  echo "Missing remote tracking ref: origin/develop" >&2
  exit 1
fi

if ! git show-ref --verify --quiet refs/remotes/origin/main; then
  echo "Missing remote tracking ref: origin/main" >&2
  exit 1
fi

source_ref="origin/develop"
target_ref="origin/main"
source_sha="$(git rev-parse "$source_ref")"
target_sha="$(git rev-parse "$target_ref")"

if [[ "$(git rev-list --count "${target_ref}..${source_ref}")" -eq 0 ]]; then
  echo "origin/develop has no changes relative to origin/main. Nothing to release." >&2
  exit 1
fi

release_date="$(date +%F)"
max_id=0

while IFS= read -r ref_name; do
  suffix="${ref_name##*.}"
  if [[ "$suffix" =~ ^[0-9]+$ ]] && (( suffix > max_id )); then
    max_id="$suffix"
  fi
done < <(
  git for-each-ref --format='%(refname:short)' "refs/heads/release/${release_date}.*" "refs/remotes/origin/release/${release_date}.*"
)

release_id=$((max_id + 1))
release_branch="release/${release_date}.${release_id}"
pr_title="Release ${release_date}.${release_id} to main"

compare_summary="$(git log --oneline "${target_ref}..${source_ref}")"
pr_body=$(
  cat <<EOF
Automated release PR from \`origin/develop\` to \`main\`.

- Source: \`${source_ref}\` at \`${source_sha}\`
- Target: \`main\`
- Release branch: \`${release_branch}\`

Commits included:

\`\`\`
${compare_summary}
\`\`\`

After merge, the GitHub Pages workflow from \`.github/workflows/deploy-pages.yml\` will build and deploy the app automatically.
EOF
)

echo "Repository: ${repo_root}"
echo "Source: ${source_ref} (${source_sha})"
echo "Target: ${target_ref} (${target_sha})"
echo "Release branch: ${release_branch}"
echo "PR title: ${pr_title}"

if [[ "$dry_run" == true ]]; then
  echo
  echo "Dry run only. Planned commands:"
  echo "git switch -c ${release_branch} ${source_ref}"
  echo "git push -u origin ${release_branch}"
  echo "gh pr create --base main --head ${release_branch} --title \"${pr_title}\" --body-file <tempfile>"
  exit 0
fi

git switch -c "$release_branch" "$source_ref"
git push -u origin "$release_branch"
gh pr create --base main --head "$release_branch" --title "$pr_title" --body "$pr_body"
