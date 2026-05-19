# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React 19 app written in TypeScript. Application code lives under `src/`: `src/main.tsx` bootstraps React, `src/App.tsx` is the main app component, `src/index.css` contains global Tailwind CSS, `src/components/ui/` holds shadcn/ui components, and `src/lib/utils.ts` contains shared helpers. Static files belong in `public/`; imported assets can live in `src/assets/`. Use the `@/` alias for imports from `src`, for example `@/components/ui/button`.

## Build, Test, and Development Commands

Use pnpm with the checked-in `pnpm-lock.yaml`.

- `pnpm dev`: start the Vite dev server on the network host.
- `pnpm build`: run TypeScript project build, then generate the production Vite build in `dist/`.
- `pnpm preview`: serve the production build locally for inspection.
- `pnpm lint`: run ESLint across the repository.
- `pnpm typecheck`: run TypeScript without emitting files.
- `pnpm format`: format `ts` and `tsx` files with Prettier and Tailwind class sorting.

## Coding Style & Naming Conventions

Prefer TypeScript and functional React components. Use PascalCase for component names, camelCase for functions and variables, and lowercase kebab-case for new route-like or asset filenames when no component is exported. Keep shadcn/ui primitives in `src/components/ui/`; place feature-specific components in `src/components/` or a feature subdirectory as the app grows. Prettier is the source of formatting truth, with `prettier-plugin-tailwindcss` handling class order. ESLint uses recommended JavaScript, TypeScript, React Hooks, and React Refresh rules.

## Testing Guidelines

No test runner is currently configured. Until one is added, verify changes with `pnpm typecheck`, `pnpm lint`, and `pnpm build`. When adding tests, prefer Vitest plus React Testing Library for component behavior, place tests next to the code as `*.test.ts` or `*.test.tsx`, and add a `pnpm test` script to `package.json`.

## Commit & Pull Request Guidelines

The current history uses Conventional Commit style, for example `feat: initial commit`. Continue using short, imperative messages such as `feat: add campaign tabs`, `fix: handle empty state`, or `chore: update lint config`. Pull requests should include a concise summary, verification commands run, linked issue or task context when available, and screenshots or recordings for visible UI changes.

## Security & Configuration Tips

Do not commit secrets or local environment files. Keep generated output such as `dist/` out of source control. Review dependency additions carefully and prefer existing libraries already in use: React, Vite, Tailwind CSS, shadcn/ui, Base UI, and lucide-react.
