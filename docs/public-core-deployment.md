# Public deployment and independent updates

The public site at https://bill-nye.subcult.tv/ serves 100 reviewed programs
through the independently published Arkhiv core 0.1.1. Its scope is
`bill-nye`. The existing distinct frontend belongs to this repository.

`deploy/archive-core.env` and `deploy/core-release.json` record the immutable
API image and compatibility contract. Future core releases update these two
files through the API-only reviewed PR lane. The API pin check requires no
frontend package install, lockfile change or interface rebuild. Frontend component
updates remain a separate optional reviewed lane; the historical combined-engine
pin is retained for the legacy/private deployment.

Almaz's public runtime is owned by the separate
`arkhiv-platform-public-20261004` Compose project. Its public API uses a SELECT-only
database role, public audience and this collection scope. The immutable frontend
wrapper image is `sha256:910c849176edfd6b7c8de0440c9a78d11b7dd64ac139d00b60f3223491ecdee4`. The wrapper's complete static file manifest
matches this repository's qualified frontend artifact. Public rollout replaced
the core containers while preserving the frontend images and verified that each
proxy still reached the correct collection after Docker reused addresses.

Updating a source pin creates a reviewable change; deployment is a separate
operation. The operator must verify the registry digest and contract, retain the
previous image and fresh independent checkpoint, update only the API service,
and check public catalog, playback, schedule and access boundaries through the
unchanged frontend. A private historical engine is not automatically a safe
public rollback. Operational ownership and live image receipts remain in
Machinum and the deployment's private qualification directory.

Bill Nye serves the 100 previously approved local MP4 originals. The public
rollout reused their verified copies without acquiring replacement media.
