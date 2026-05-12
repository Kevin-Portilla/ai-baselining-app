# Git Workflow Standards

> Branching strategy, commit conventions, and version control practices.
> Changes require ADR approval.

---

## MANDATORY RULE — No Direct Commits to `develop` or `main`

> **Every change — no matter how small — MUST follow this flow:**
>
> ```
> feature branch  →  PR  →  CI passes  →  merge to develop
> ```
>
> Direct commits to `develop` or `main` are **forbidden without exception**.
> This includes documentation fixes, config tweaks, and one-line changes.

### Enforcement Checklist (before any merge)

- [ ] Change is on its own branch (not `develop`, not `main`)
- [ ] PR is open targeting `develop`
- [ ] CI jobs `Lint` and `Build` are both green ✅
- [ ] Branch is up to date with `develop` (no conflicts)
- [ ] PR is merged via GitHub — not by pushing directly

---

## Branching Strategy

### Branch Types

| Branch | Purpose | Naming | Branches from | Merges to |
|--------|---------|--------|--------------|-----------|
| `main` | Production-ready code | `main` | `release/*` or `hotfix/*` only | — |
| `develop` | Integration branch | `develop` | — | `main` (via release) |
| `feat/*` | New features | `feat/short-description` | `develop` | `develop` |
| `refactor/*` | Code restructuring | `refactor/short-description` | `develop` | `develop` |
| `bugfix/*` | Bug fixes | `bugfix/issue-description` | `develop` | `develop` |
| `hotfix/*` | Production fixes | `hotfix/issue-description` | `main` | `main` + `develop` |
| `release/*` | Release preparation | `release/vX.Y.Z` | `develop` | `main` + `develop` |
| `docs/*` | Documentation only | `docs/short-description` | `develop` | `develop` |

### Branch Flow

```
main ────────────────────────────────────────────●──────▶
                                                 ▲
                                         release/* PR (CI ✅)
                                                 │
develop ──●──────●──────●──────●──────●──────────●──────▶
          ▲      ▲      ▲      ▲      ▲
     feat/* PR  PR    PR    bugfix/* PR
     (CI ✅) (CI ✅) (CI ✅)  (CI ✅)  (CI ✅)

Rule: every arrow (▲) is a PR that must have green CI before merge.
```

### Branch Rules

#### `main`
- Always deployable — represents what is in production
- **No direct commits — ever**
- Only receives merges from `release/*` or `hotfix/*`
- Requires PR with CI passing (`Lint` + `Build` green)

#### `develop`
- Integration target for all in-progress work
- **No direct commits — ever**
- Every change arrives via a PR from a feature/bugfix/refactor branch
- Requires PR with CI passing (`Lint` + `Build` green)
- Must be kept green at all times

#### `feat/*` / `refactor/*` / `bugfix/*` / `docs/*`
- Always branch from `develop` (not from `main`)
- Always target `develop` in the PR (not `main`)
- CI must pass before merge is allowed
- Delete branch after merge
- Keep up to date with `develop` if long-lived

#### `hotfix/*`
- Branch from `main` only (for live production issues)
- Merge to `main` AND back-merge to `develop`
- CI must pass on both PRs

#### `release/*`
- Branch from `develop` when preparing a release
- Merge to `main` AND back-merge to `develop`
- CI must pass before merging to `main`

---

## CI Gate — Required Before Any Merge

Both CI jobs must be green before a PR can be merged:

| Job | What it checks | Must pass |
|-----|---------------|-----------|
| `Lint` | ESLint — no unused vars, no syntax errors | ✅ Required |
| `Build` | Vite production build — no missing imports | ✅ Required |

**A PR with failing CI must not be merged**, even if the failure seems unrelated to the change. Fix CI first.

---

## Step-by-Step: Creating a Feature or Fix

```bash
# 1. Make sure you're on an up-to-date develop
git checkout develop
git pull origin develop

# 2. Create your branch
git checkout -b feat/my-feature      # or bugfix/, refactor/, docs/

# 3. Make your changes and commit
git add <files>
git commit -m "feat(scope): describe the change"

# 4. Push your branch
git push -u origin feat/my-feature

# 5. Open a PR on GitHub targeting `develop`
#    → Wait for CI to pass (Lint ✅ + Build ✅)
#    → Merge the PR

# 6. Clean up
git branch -d feat/my-feature
```

---

## Commit Conventions

### Format

```
<type>(<scope>): <subject>

[optional body — what and why, not how]

[optional footer — issue refs, breaking changes, co-authors]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no feature/fix |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Build, config, dependencies |
| `ci` | CI/CD pipeline changes |
| `revert` | Reverting previous commit |

### Subject Rules

- Imperative mood ("add" not "added")
- No period at end
- Max 50 characters
- Lowercase

### Examples

```
feat(survey): add evidence textarea to level 3 questions

fix(maturity): prevent .length crash on undefined form fields

Accessing .length on fields removed from initialForm caused a blank
page. Added || [] safety guard. See RCA-001.

docs(adr): update ADR-002 status from Proposed to Accepted

ci: split lint and build into separate jobs
```

---

## Pull Request Requirements

### Before Opening a PR

- [ ] Branch was created from `develop` (not `main`)
- [ ] Branch name follows convention (`feat/`, `fix/`, `refactor/`, etc.)
- [ ] Code runs locally without errors
- [ ] All new form fields added to `initialForm` (BR-007)
- [ ] Self-review completed

### PR Must Have

- [ ] Title follows commit convention format
- [ ] Description explains what changed and why
- [ ] Target branch is `develop` (never `main` for features)
- [ ] CI passes: both `Lint` ✅ and `Build` ✅ are green
- [ ] No merge conflicts with `develop`

### PR Size Guidelines

| Size | Lines Changed | Guidance |
|------|---------------|----------|
| XS | < 50 | Fine as-is |
| S | 50–200 | Normal size |
| M | 200–500 | Acceptable |
| L | 500–1000 | Consider splitting |
| XL | > 1000 | Split before review |

### Merge Strategy

- **Squash and merge** for `feat/*`, `bugfix/*`, `refactor/*`, `docs/*`
- **Merge commit** for `release/*` (preserve commit history)
- **Rebase and merge** for single-commit hotfixes

---

## Protected Branch Configuration

The following GitHub branch protection rules must be active:

### `main`

```yaml
protection:
  required_status_checks:
    - Lint        # CI job name
    - Build       # CI job name
  require_branches_to_be_up_to_date: true
  required_reviews: 1
  dismiss_stale_reviews: true
  allow_force_push: false
  allow_deletion: false
  restrict_pushes: true   # no direct pushes
```

### `develop`

```yaml
protection:
  required_status_checks:
    - Lint
    - Build
  require_branches_to_be_up_to_date: true
  required_reviews: 1
  allow_force_push: false
  allow_deletion: false
  restrict_pushes: true   # no direct pushes
```

---

## Version Tagging

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes
MINOR: New features, backward compatible
PATCH: Bug fixes, backward compatible
```

```bash
# Tag after merging release/* to main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## Git Best Practices

### Do
- Create a branch for every change, even small ones
- Keep branches short-lived (< 1 week ideally)
- Push early and open a Draft PR to get CI feedback
- Write meaningful commit messages (what + why)
- Rebase on `develop` if your branch is out of date

### Don't
- Commit directly to `develop` or `main`
- Merge without CI being green
- Force-push to shared branches (`develop`, `main`)
- Commit secrets, credentials, or `node_modules`
- Rewrite published history
- Keep stale branches alive after merge

---

## Conflict Resolution

```bash
# Update your branch with latest develop
git fetch origin
git rebase origin/develop

# Resolve conflicts, then:
git add <resolved-files>
git rebase --continue
```

- Understand both sides of the conflict before resolving
- Test after resolution
- Re-run lint + build locally before pushing

---

## Emergency Procedures

### Reverting a Bad Merge to Develop

```bash
# Identify the merge commit
git log --oneline develop

# Create a revert branch
git checkout -b bugfix/revert-bad-merge develop
git revert -m 1 <merge-commit-hash>

# Open a PR targeting develop — wait for CI ✅
```

### Recovering a Deleted Branch

```bash
git reflog
git checkout -b <branch-name> <commit-hash>
```

---

*Last Updated: 2026-05-12*
*Requires ADR to modify*
