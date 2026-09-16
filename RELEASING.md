# Releasing

## Versioning contract

**`package.json` on `main` always holds the next _unreleased_ version, as a plain `X.Y.Z`.**

Everything else follows from that single rule:

| Channel | Version | Published by |
| --- | --- | --- |
| `dev` | `X.Y.Z-dev.<timestamp>.<sha>` | `publish-dev.yml`, every 12h and on demand |
| `latest` | `X.Y.Z` | `publish-stable.yml`, on a `vX.Y.Z` tag push |

Because dev builds are semver _prereleases_ of the version they lead up to, they
sort after the previous stable release and before their own:

```
2.0.0  <  2.2.0-dev.1783676876.ea38136  <  2.2.0-dev.1783776876.abc1234  <  2.2.0
```

Prereleases are excluded from ranges like `^2.0.0`, so dev builds never reach
users who did not ask for them with `npm install wolvesville.js@dev`.

## Cutting a stable release

1. Make sure `package.json` holds the version you intend to release and `main` is green.
2. Tag and push:
   ```sh
   git tag v$(node -p "require('./package.json').version")
   git push origin --tags
   ```
3. `publish-stable.yml` verifies the tag matches `package.json` and that the version
   is not on npm already, lints, then publishes to `latest`.
4. Open the next cycle by bumping to the next unreleased version:
   ```sh
   npm pkg set version=2.3.0
   git commit -am "chore: begin 2.3.0 development"
   ```
   Until you do, `publish-dev.yml` fails on purpose — it refuses to build dev
   prereleases of a version that is already released.

The version is never edited by CI on `main`; both workflows set it only on the
throwaway runner checkout. The tag, `package.json` and the npm version cannot drift.
