# AI & Coding Standards

## Forms

- **Stack**: `react-hook-form` + `zod` + `@hookform/resolvers/zod`.
- **Rules**: Use `useForm` (no `useState`), infer types from Zod schema, show `formState.errors`.

## DB (Supabase)

- **Modular**: `lib/supabase/db/{tables,functions,triggers}/*.sql`.
- **Workflow**: Create SQL file -> Verify in Supabase -> No single `schema.sql`.

## UI/Dark Mode

- **Dark Mode**: Mandatory. Use semantic colors (`text-foreground`) or `dark:` variants.
- **Contrast**: Verify visibility in both modes.

## Auth & Security

- **Lib**: `@supabase/ssr` (server), `@supabase/supabase-js` (client).
- **Protect**: Redirect auth/unauth users in middleware.
- **Client**: NEVER call Supabase directly. Wrap in Server Actions/API Routes.

## Error Handling

- **TS**: `catch (e: unknown)`. No `any`.
- **Display**: Check `e instanceof Error ? e.message : "Generic error"`.

## TypeScript

- **No `any`**: Use explicit types or `unknown`.
- **Scope**: Define types locally unless shared.

## Next.js

- **Proxy**: Use `proxy.ts` over `middleware.ts`.
- **Suspense**: Wrap `useSearchParams` in `<Suspense>`.
- **JSX**: Escape entities (`{"text"}`).
- **Utils**: Centralize helpers in `lib/`.

## Localization

- **Code/Docs**: English default.
- **UI**: `next-intl` (en/id).
