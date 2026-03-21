# Headlamp Plugin Template

A starter template for building [Headlamp](https://headlamp.dev) plugins — Kubernetes UI extensions that run inside the Headlamp desktop or web application.

## What this is

This repository is a GitHub template that gives you a working Headlamp plugin skeleton with:

- A sidebar entry and route registered via the Headlamp SDK
- A placeholder resource list component ready to be swapped for your CRD view
- Vitest + React Testing Library test setup
- ESLint + Prettier configured via `@kinvolk/headlamp-plugin`
- CI workflow (lint, typecheck, test) and a manual release workflow
- ArtifactHub metadata files for publishing your plugin
- Renovate for automated dependency updates

## Getting Started

### 1. Create your repo from this template

Click the **"Use this template"** button at the top of this page on GitHub, then create a new repository under your org.

### 2. Rename the placeholder values

Search the repo for `YOUR_ORG`, `YOUR_REPO`, and `YOUR_NAME` and replace them with your actual values. Key files to update:

| File | What to change |
|---|---|
| `package.json` | `name`, `author`, `repository`, `bugs`, `homepage` |
| `artifacthub-pkg.yml` | `name`, `displayName`, `description`, `homeURL`, `annotations` |
| `artifacthub-repo.yml` | `repositoryID` (after registering), `owners` |

### 3. Install dependencies and start developing

```bash
npm install
npm start
```

`npm start` runs `headlamp-plugin start` which launches a local dev server. Open Headlamp (desktop or `http://localhost:4466`) and load the plugin from `http://localhost:4466`.

To point Headlamp at your dev server, set the `HEADLAMP_PLUGIN_URL` in your Headlamp config or use the in-app plugin manager to add `http://localhost:4466`.

## Project Structure

```
.
├── src/
│   ├── index.tsx                        # Plugin entry point — registers sidebar entries and routes
│   └── components/
│       ├── ResourceListPage.tsx         # Placeholder list view — replace with your CRD UI
│       └── ResourceListPage.test.tsx    # Tests for the list view
├── .github/
│   └── workflows/
│       ├── ci.yaml                      # Lint, typecheck, test on every push/PR
│       └── release.yaml                 # Manual release workflow (builds + publishes artifact)
├── artifacthub-pkg.yml                  # ArtifactHub package metadata
├── artifacthub-repo.yml                 # ArtifactHub repository metadata
├── renovate.json                        # Automated dependency updates via Mend Renovate
├── tsconfig.json                        # TypeScript config (extends headlamp-plugin base)
├── vitest.config.mts                    # Vitest configuration
└── vitest.setup.ts                      # Test setup (jest-dom + localStorage shim)
```

## Building your plugin

### Adding a CRD list view

The recommended approach uses the Headlamp SDK's `K8s.makeKubeObject` helper:

```ts
import { K8s } from '@kinvolk/headlamp-plugin/lib';

// 1. Define your CRD type
interface MyResourceSpec {
  someField: string;
}

// 2. Create a typed resource class
const MyResource = K8s.makeKubeObject<MyResourceSpec>('MyResource');
MyResource.apiEndpoint = K8s.ApiProxy.apiFactory('your.group.io', 'v1', 'yourresources');

// 3. Use it in a component
function MyResourceList() {
  const [resources, error] = MyResource.useList();
  // ...
}
```

Replace the contents of `src/components/ResourceListPage.tsx` with your real list view, then update `src/index.tsx` if you need additional routes or sidebar entries.

### Common SDK imports

```ts
import {
  registerRoute,
  registerSidebarEntry,
  registerDetailsViewSection,
} from '@kinvolk/headlamp-plugin/lib';

import {
  SectionBox,
  SectionHeader,
  NameValueTable,
  Loader,
  StatusLabel,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
```

Full API reference: https://headlamp-k8s.github.io/headlamp/

## Testing

Run the test suite:

```bash
npm test
```

Run in watch mode during development:

```bash
npm run test:watch
```

Tests use [Vitest](https://vitest.dev) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). The `jsdom` environment is configured in `vitest.config.mts`. Mock `@kinvolk/headlamp-plugin/lib/CommonComponents` in your test files using `vi.mock` — see `ResourceListPage.test.tsx` for the pattern.

## Packaging for ArtifactHub

After your first release:

1. Update `artifacthub-pkg.yml`:
   - Set `version` and `appVersion` to the released version
   - Update `annotations.headlamp/plugin/archive-url` to point to the release artifact URL
   - Compute the SHA-256 checksum of the `.tar.gz` artifact and set `annotations.headlamp/plugin/archive-checksum`

2. Register your repository on [ArtifactHub](https://artifacthub.io) and paste the `repositoryID` into `artifacthub-repo.yml`.

3. ArtifactHub will automatically pick up new versions when you push updated `artifacthub-pkg.yml` files to your default branch.

Checksum example:
```bash
sha256sum my-headlamp-plugin-0.1.0.tar.gz
```

## CI/CD

### CI (`ci.yaml`)

Runs on every push to `main` and every pull request. Delegates to the shared `plugin-ci.yaml` workflow which runs:

- TypeScript typecheck (`tsc --noEmit`)
- ESLint
- Prettier format check
- Vitest test suite
- Production build

### Release (`release.yaml`)

Triggered manually from the GitHub Actions UI with a `version` input (e.g. `1.0.0`). Delegates to the shared `plugin-release.yaml` workflow which:

- Bumps the version in `package.json`
- Runs `headlamp-plugin package` to produce a `.tar.gz` artifact
- Creates a GitHub release with the artifact attached
- Updates `artifacthub-pkg.yml` with the new version and archive URL

## Resources

- [Headlamp documentation](https://headlamp.dev/docs/latest/)
- [Headlamp plugin development guide](https://headlamp.dev/docs/latest/development/plugins/)
- [Headlamp SDK API reference](https://headlamp-k8s.github.io/headlamp/)
- [ArtifactHub Headlamp plugins](https://artifacthub.io/docs/topics/repositories/headlamp-plugins/)
- [Headlamp GitHub](https://github.com/headlamp-k8s/headlamp)
