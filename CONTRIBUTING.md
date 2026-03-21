# Contributing

Thank you for your interest in contributing. This guide covers how to work on this plugin locally and what to expect from the review process.

## Running the plugin locally

### Prerequisites

- Node.js 18 or later
- A running Headlamp instance (desktop app or `headlamp-server`)

### Setup

```bash
npm install
npm start
```

`npm start` runs `headlamp-plugin start`, which starts a dev server at `http://localhost:4466`. Headlamp will hot-reload the plugin as you save files.

To connect Headlamp to your local dev server, use the in-app plugin manager or set the plugin source URL to `http://localhost:4466`.

### Build

```bash
npm run build
```

Produces a production bundle in `dist/`. Copy the `dist/` folder to your Headlamp plugins directory:

- **Linux**: `~/.config/Headlamp/plugins/<plugin-name>/`
- **macOS**: `~/Library/Application Support/Headlamp/plugins/<plugin-name>/`
- **Windows**: `%APPDATA%\Headlamp\plugins\<plugin-name>\`

## Code style

This project uses TypeScript, ESLint, and Prettier. All configuration is provided by `@kinvolk/headlamp-plugin`.

Check types:
```bash
npm run tsc
```

Lint:
```bash
npm run lint
npm run lint:fix   # auto-fix where possible
```

Format:
```bash
npm run format          # write changes
npm run format:check    # check only (used in CI)
```

CI will fail if any of these checks fail. Run them locally before opening a PR.

## Testing

All new code must have tests. Run the suite with:

```bash
npm test
```

Watch mode during development:

```bash
npm run test:watch
```

Tests use Vitest with React Testing Library and the jsdom environment. Key conventions:

- Place test files alongside the component they test, named `ComponentName.test.tsx`.
- Mock `@kinvolk/headlamp-plugin/lib/CommonComponents` using `vi.mock` — see `src/components/ResourceListPage.test.tsx` for the established pattern.
- Avoid testing implementation details; prefer assertions against rendered output.

## Pull request process

1. Fork the repository and create a branch from `main`.
2. Make your changes with tests.
3. Ensure `npm run tsc`, `npm run lint`, `npm run format:check`, and `npm test` all pass.
4. Open a pull request against `main` with a clear description of what changed and why.
5. The CI workflow will run automatically. Address any failures before requesting review.
6. A maintainer will review and merge the PR.

## Releasing

Releases are triggered manually via the **Release** GitHub Actions workflow. Maintainers run this workflow with the target version number; it packages the plugin, creates a GitHub release, and updates the ArtifactHub metadata.
