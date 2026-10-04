# Bill Nye / Science TV

A standalone episode library and shared scheduled replay channel, built on the
shared VHNESS engine. This repository owns its frontend, design system, assets,
and deployment configuration. The viewer adapter and deployment helpers are
pinned generated copies, verified against engine revision `1980c704e7495557c06fb9e6ac63e47ecc244dab`.

Both on-demand playback and Tune in/Rejoin use the same reviewed content and
source attribution. Viewer controls never change the shared schedule. Original
dates remain visible and archived programming is labeled as replay.

The design uses a 1990s science-TV cabinet, the supplied series logo, tactile controls, orbit graphics, a phosphor-style standby screen, and an optional picture effect. Native controls, captions where eligible, and original picture proportions remain readable. Reduced motion is respected. All 100 source MP4s total 13,763,456,996 bytes; preservation uses the owner-reviewed 16 GiB limit and 1 GiB reserve, with an independent NUC backup. AVI duplicates are not needed. Unknown episode dates stay unknown.

## Verify and build

Run `make verify` for adapter/tool/asset hashes, frozen dependencies,
typecheck, lint, model tests, and production frontend build. Browser playback,
audible fidelity, shared-channel drift, restore, and deployment remain distinct
checks. Read `AGENTS.md` before changing generated code.

Build the pinned engine image from its source first, or load its verified image
archive. Then build this app:

```sh
docker build --build-arg ENGINE_IMAGE=vhness-engine:1980c704e7495557c06fb9e6ac63e47ecc244dab \
  -t bill-nye-tv:APP_SOURCE_SHA .
python3 scripts/deploy.py prepare \
  --root ~/.local/state/video-archive/bill-nye-tv --project bill-nye-tv \
  --image bill-nye-tv:APP_SOURCE_SHA --collection bill-nye --port 48073
python3 scripts/deploy.py start \
  --root ~/.local/state/video-archive/bill-nye-tv --project bill-nye-tv \
  --snapshot /absolute/reviewed/bill-nye-tv.dump
```

Pass `--media ~/.local/state/vhness/private-pilot/media` to `prepare` on the verified primary host, or the corresponding independently verified restored media root on NUC. Do not move originals or expand preservation through deployment.

The helper creates separate private credentials and database state, binds to loopback, and restores snapshots only into an empty owned database. Public ingress remains a separate owner decision. Never reuse another product's secrets or reset an existing database.

See [engine deployment operations](docs/engine-deployment.md) for source refresh, explicit private-library review, seven-day replay planning/renewal, preservation, and rollback. No host timers are installed automatically.

## Assets and software license

This is an independent archive viewer, not an assertion of official affiliation. [Asset provenance](docs/asset-provenance.json) records supplied filenames and hashes. Software follows the engine's GPL-3.0 license; third-party logos, photography, and inspiration retain their separate provenance and are not assigned that software license. Public-release clearance remains separate. Runtime media, metadata snapshots, secrets, and generated evidence stay outside Git.

## Public core deployment

The public site is live at https://bill-nye.subcult.tv/. The frontend remains
owned here; the independently released headless core has its own reviewed update
pin. See [public deployment and updates](docs/public-core-deployment.md).
