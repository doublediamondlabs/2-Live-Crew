# Maintainer notes

## Structure

All runtime files are in `docs/`. Scripts intentionally share browser globals and load in the order listed in `index.html`.

- `app.js`: state initialization, routing, crew actions, setup.
- `model.js`: weighted pace estimates and stretch review.
- `formats.js`, `course.js`, `races.js`: format generation, editable courses/history, race collection and JSON import/export.
- `backyard.js`: anchored yard schedule, countdown, fast check-ins.
- `fuel.js`, `mix.js`, `gear.js`, `checkin.js`: plans and actual records.
- `housekeeping.js`: one visible-app refresh scheduler, Battery Lean setting and race deletion.
- `progress.js`: live totals, split/loop views, CSV, reports and keepsakes.
- `start.js`, `home.js`: start/loadout, home and navigation.
- `alerts.js`: visible-app arrival reminders and optional audio.
- `install.js`, `sw.js`, `manifest.webmanifest`: installation and offline shell.

## Portable-only changes

- Generic practice runner replaces the original family-oriented sample names.
- No hosted project identity, Git history, tokens, saved browser records, or personal backups are included.
- Relative asset paths and manifest scope work under a GitHub project subdirectory.
- Browser storage and offline-cache names are scoped to the deployed app path to avoid collisions with other copies on the same GitHub Pages origin.
- The public edition begins with offline shell `v2`; bump this for every runtime release.

## Preserve records

Keep the JSON envelope (`run-far-races`, version 1) backward-compatible. Do not rename or clear storage keys during an ordinary update. If schema migration is needed, implement it explicitly and preserve a copy before transforming records. Do not ship actual user backups as fixtures.

## Release checklist

1. Edit `docs/`, keeping script order and relative paths intact.
2. Run `node --check` on changed JavaScript files.
3. For added runtime files, update both the `sw.js` file list and `install.js` required-files list.
4. Increment the current `v2` suffix of `CACHE` in `docs/sw.js` for each release (v3, v4, etc.). Preserve `CACHE_PREFIX` scoping.
5. Test a new notebook and an imported backup; confirm changes survive close/reopen.
6. Test fixed loops, timed loops, Backyard starts, and appending a loop without losing prior records.
7. Check compact layout on Android, five-minute timer emphasis, one-tap return/start, and manual corrections.
8. Check CSV, print/PDF, keepsake photo, and complete JSON backup/restore.
9. Commit and push. Confirm the Pages deployment succeeds.
10. Open online to receive the update, then test a full offline close/reopen on the published address.

Do not use private race screenshots or backups in public issues. Describe a problem with fictional reproduction data instead.

## Hosting

GitHub Pages source: main branch, `/docs` directory. No Actions workflow, server, database, or package manager is required by this version. Other static HTTPS hosts can serve the contents of `docs/` directly. Changing host/path requires users to export/import their notebook.

## Source baseline

Portable candidate 0.1.1 was prepared from hosted source commit `a15e827b45bac0e1f0bf813d9e79663eaf656bf1` (hosted v48). Later changes in the hosted and portable copies do not sync automatically. Choose one canonical repository for future development once migration is complete.
