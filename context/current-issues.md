Note: every specific error should be separated by the line provided at the bottom to separate them.

## Error 1:

`colorInputBackground` is not a valid Clerk appearance variable.

## Error Message:

```
app/layout.tsx(34,15): error TS2561: Object literal may only specify known properties,
but 'colorInputBackground' does not exist in type 'Variables'.
Did you mean to write 'colorBackground'?
Failed to type check.
```

## Fix version:

Removed `colorInputBackground` from the `variables` object in `app/layout.tsx`.
Used `colorInput` (the correct Clerk property for input background) instead.

## Action and steps to address the error:

1. Opened `node_modules/@clerk/react/dist/types-kUVwkmSn.d.mts` and searched for the `Variables` interface to get the exact list of valid property names.
2. Replaced `colorInputBackground` with `colorInput: "var(--bg-surface)"`.
3. Also replaced `colorInputText` with `colorInputForeground: "var(--text-primary)"` (same root cause — wrong property name).
4. Rebuilt — TypeScript passed.

## How to avoid it in future sessions:

- Always check the Clerk `Variables` type definition in `node_modules/@clerk/react/dist/types-kUVwkmSn.d.mts` before writing appearance variable names. The valid set is: `colorPrimary`, `colorPrimaryForeground`, `colorDanger`, `colorSuccess`, `colorWarning`, `colorNeutral`, `colorForeground`, `colorMuted`, `colorMutedForeground`, `colorBackground`, `colorInputForeground`, `colorInput`, `colorShimmer`, `colorRing`, `colorShadow`, `colorBorder`, `colorModalBackdrop`, `fontFamily`, `fontFamilyButtons`, `fontFamilyMono`, `fontSize`, `fontWeight`, `borderRadius`, `spacing`.
- There are no `colorText`, `colorTextSecondary`, or `colorInputBackground` properties — these are common guesses that fail TypeScript.

##DONE
-----------------------------------------------------------------------------

## Error 2:

`colorText` and `colorTextSecondary` are not valid Clerk appearance variables.

## Error Message:

```
app/layout.tsx(35,15): error TS2353: Object literal may only specify known properties,
and 'colorText' does not exist in type 'Variables'.
Failed to type check.
```

## Fix version:

Replaced `colorText` with `colorForeground` and `colorTextSecondary` with `colorMutedForeground` in the `ClerkProvider` appearance `variables` block in `app/layout.tsx`.

## Action and steps to address the error:

1. Consulted the full `Variables` type from the Clerk React types bundle.
2. Found that the correct equivalents are `colorForeground` (default text) and `colorMutedForeground` (secondary/muted text).
3. Updated `app/layout.tsx` and rebuilt.

## How to avoid it in future sessions:

- The Clerk naming convention for text colors is `colorForeground` (not `colorText`) and `colorMutedForeground` (not `colorTextSecondary`). This mirrors the shadcn/Tailwind convention of `foreground` rather than `text`.
- Keep the valid `Variables` property list in mind (see Error 1 above for the full list).

##DONE
-----------------------------------------------------------------------------

## Error 3:

Clerk `<SignIn />` and `<SignUp />` components use `usePathname()` internally (a Client Component hook), which blocks Next.js 16 prerendering when used outside a `<Suspense>` boundary.

## Error Message:

```
Error: Route "/sign-in/[[...sign-in]]": Next.js encountered URL data `usePathname()`
in a Client Component outside of `<Suspense>`.

This blocks prerendering because the value is only available at runtime.

Ways to fix this:
  - [stream] Wrap the component in <Suspense fallback={...}> so the hook value streams
    in after prerendering
  - [block] Set `export const instant = false` to allow a blocking route
```

## Fix version:

Wrapped `<SignIn />` and `<SignUp />` each in a `<Suspense>` boundary inside their respective page components.

```tsx
import { Suspense } from "react";

<Suspense>
  <SignIn />
</Suspense>
```

## Action and steps to address the error:

1. Error appeared in the browser console and Next.js dev output when visiting `/sign-in`.
2. Added `import { Suspense } from "react"` to both sign-in and sign-up page files.
3. Wrapped the Clerk component in `<Suspense>` with no explicit fallback (Clerk handles its own loading state).
4. Rebuilt — error resolved.

## How to avoid it in future sessions:

- Any Clerk UI component (`<SignIn />`, `<SignUp />`, `<UserButton />`, etc.) that relies on router hooks (`usePathname`, `useRouter`) must be wrapped in `<Suspense>` when used in Next.js App Router pages.
- This is a requirement of Next.js 16's strict prerendering model, not a Clerk bug.
- Alternatively, add `export const instant = false` at the top of the page file to opt into blocking (server-side-only) rendering, but `<Suspense>` is preferred for streaming performance.

##DONE
-----------------------------------------------------------------------------

## Error 4:

Root page `/` using `await auth()` (which reads cookies/headers at runtime) blocks Next.js 16 prerendering without a `<Suspense>` wrapper or opt-out export.

## Error Message:

```
Error: Route "/": Next.js encountered runtime data during prerendering.

`cookies()`, `headers()`, `params`, or `searchParams` accessed outside of `<Suspense>`
prevents the route from being prerendered, blocking the page load.

Ways to fix this:
  - [stream] Provide a placeholder with <Suspense fallback={...}> around the data access
  - [block] Set `export const instant = false` to allow a blocking route
```

## Fix version:

Added `export const instant = false` at the top of `app/page.tsx` to allow Next.js to render this route dynamically (server-side on each request) rather than attempting to prerender it.

```ts
export const instant = false;

export default async function Home() {
  const { userId } = await auth();
  ...
}
```

## Action and steps to address the error:

1. Error appeared when visiting `/` in dev mode and in build output.
2. Identified that `await auth()` internally calls `cookies()` which is a dynamic runtime API.
3. Added `export const instant = false` to `app/page.tsx` as the cleanest opt-out that avoids requiring a `<Suspense>` wrapper on a redirect-only page.
4. Rebuilt — error resolved.

## How to avoid it in future sessions:

- Any server component page that calls `auth()`, `cookies()`, or `headers()` cannot be statically prerendered. Always add `export const instant = false` to such pages, or wrap the dynamic access in a child component inside `<Suspense>`.
- Redirect-only root pages (like the auth gateway `/`) should always use `export const instant = false` since they never output static HTML anyway.

##DONE
-----------------------------------------------------------------------------

## Error 5:

Clerk's `createRouteMatcher` is deprecated in `@clerk/nextjs` v7 and will be removed in the next major release.

## Error Message:

```
Clerk - DEPRECATION WARNING: "createRouteMatcher" is deprecated and will be removed
in the next major release.
Use resource-based auth checks instead. Move auth checks into each page, layout,
API route, or Server Function that accesses protected data. Middleware-based auth checks
rely on path matching, which can diverge from how Next.js routes requests and leave
protected resources reachable.
For a migration guide, see: https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
```

## Fix version:

Replaced `createRouteMatcher` with a direct `pathname.startsWith()` check against the sign-in and sign-up env vars in `proxy.ts`.

```ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  const signInPath = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in";
  const signUpPath = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up";

  const isPublic =
    pathname.startsWith(signInPath) || pathname.startsWith(signUpPath);

  if (!isPublic) {
    await auth.protect();
  }
});
```

## Action and steps to address the error:

1. Warning appeared in the terminal when starting `next dev`.
2. Removed `createRouteMatcher` import and usage from `proxy.ts`.
3. Replaced it with a manual `pathname.startsWith()` check using the existing `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars.
4. Rebuilt — warning gone.

## How to avoid it in future sessions:

- Do not use `createRouteMatcher` from `@clerk/nextjs/server` in new code. It is deprecated as of v7.
- Use `pathname.startsWith()` or `pathname.includes()` directly against the `request.nextUrl` for middleware-level public route detection.
- For per-page protection, prefer calling `auth.protect()` or checking `await auth()` inside individual page/layout server components.

##DONE
-----------------------------------------------------------------------------
