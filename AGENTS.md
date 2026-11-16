<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Instructions

- Use TypeScript.
- Use Tailwind CSS.
- Use shadcn/ui when appropriate.
- Components should be Server Components by default.
- Use "use client" only when the component requires client-side features such as state, effects, event handlers, or browser APIs.
- Do not install any package unless it is necessary.
- Keep components small and reusable.
- Do not modify unrelated files.
- Fix any errors caused by your changes.

## Component Structure

- Every custom component must have its own folder.
- Any custom component must have @type folder inside it for any required types needed
- Use PascalCase for custom component folders and files.
- Follow this structure for custom components:

  `src/components/ComponentName/ComponentName.tsx`

- Example:

  `src/components/Navbar/Navbar.tsx`

- Route pages are an exception to this rule.
- Route pages must have loading.tsx and not-found.tsx to handle it.
- Route pages must follow the Next.js App Router structure:

  `src/app/route-name/page.tsx`

- Keep route pages as Server Components by default.
- Only use "use client" when client-side behavior is actually required.
