# AI Configuration & Coding Standards

## Form Handling Standards

All forms in this project MUST use the following stack and patterns:

1.  **Library**: `react-hook-form`
    - Do NOT use local state (`useState`) for form fields.
    - Use the `useForm` hook for form state management.

2.  **Validation**: `zod` with `@hookform/resolvers/zod`
    - Define a Zod schema for every form.
    - Infer TypeScript types from the Zod schema (`z.infer<typeof Schema>`).

3.  **Components**:
    - Integrate with UI components (Input, Select, etc.) using the `register` method or `Controller` if necessary.
    - Display validation errors clearly below each field using `formState.errors`.

### Example Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
    </form>
  );
}
```

## Database Schema Management

All Supabase database schema definitions are modularized in the `lib/supabase/db/` directory:

- **Tables**: `lib/supabase/db/tables/*.sql` (Table definitions and RLS policies)
- **Functions**: `lib/supabase/db/functions/*.sql` (Database functions)
- **Triggers**: `lib/supabase/db/triggers/*.sql` (Database triggers)

Whenever you modify the database structure (e.g., adding a new table, changing a column, updating RLS policies), you MUST:

1.  Create or update the corresponding SQL file in the appropriate subdirectory.
2.  Ensure the SQL is valid and can be run in the Supabase SQL Editor.
3.  Do NOT put everything in a single `schema.sql` file; keep it modular.

## Theme & Dark Mode Compatibility

1.  **Always Support Dark Mode**: Every UI component MUST look good and be readable in both Light and Dark modes.
2.  **Use Semantic Colors**: Prefer using CSS variables or semantic utility classes (e.g., `text-foreground`, `bg-background`, `border-border`) over hardcoded colors like `text-black` or `bg-white`.
3.  **Explicit Dark Variants**: If using neutral or specific colors, ALWAYS provide a `dark:` variant.
    - ❌ Bad: `text-neutral-600 bg-white`
    - ✅ Good: `text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900`
4.  **Test Visibility**: Verify that text contrast is sufficient and background colors are appropriate in dark mode, especially for popups, dropdowns, and cards.

## Authentication & Middleware

1.  **Library**: `@supabase/ssr`
    - Use `@supabase/ssr` for server-side operations (Middleware, Server Components, Server Actions).
    - Use `@supabase/supabase-js` for client-side operations only.

2.  **Middleware Protection**:
    _ `middleware.ts` is the central place for route protection.
    _ **Authenticated Users**: Must be redirected AWAY from `/login` and `/register` (e.g., to `/learn`).
    88→ \* **Unauthenticated Users**: Must be redirected TO `/login` if accessing protected routes (e.g., `/learn`, `/profile`, `/settings`).

## Client-Side Security & Server Actions

1.  **Avoid Direct Supabase Calls on Client**:
    - **NEVER** call Supabase methods (Auth, Database, Storage, etc.) directly in Client Components.
    - **ALWAYS** wrap Supabase logic inside **Server Actions** or **API Routes** (Route Handlers).
    - This ensures that the underlying technology (Supabase) is completely hidden from the client-side code and browser network tab.
    - The client should only communicate with your own Next.js API endpoints.
    - Example: Use `api/auth/forgot-password` instead of `supabase.auth.resetPasswordForEmail`.
    - Example: Use `api/lessons/get` instead of `supabase.from('lessons').select()`.

## Error Handling (TypeScript)

1.  **NEVER** use `catch (e: any)`.
2.  **NEVER** use implicit `catch (e)`.
3.  **ALWAYS** use `catch (e: unknown)`.
4.  **When showing error to user**:
    - If `e instanceof Error`, use `e.message`.
    - Otherwise, use a generic fallback message.

### Standard Pattern

```ts
try {
  // logic
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : "An error occurred"; // Or "Terjadi kesalahan" if ID language requested

  setMessage({ type: "error", text: message });
}
```

### Empty Catch (If error is not used)

Use empty catch block **WITHOUT** parameter.

```ts
try {
  // logic
} catch {
  setMessage({ type: "error", text: "An error occurred" });
}
```

## TypeScript Best Practices

1.  **Avoid `any`**: Do NOT use the `any` type unless absolutely necessary (no other solution exists).
2.  **Explicit Types**: Prefer explicit type definitions over `any` or implicit `any`.
3.  **Use `unknown`**: When the type is truly unknown, use `unknown` instead of `any` and perform type checking before usage.
4.  **Reuse Existing Types**: Always check if a type is already defined before creating a new one. Do not create arbitrary types if a suitable one exists.
5.  **Type Definition Location**: Define types at their smallest scope (e.g., in the component that defines the props) unless it is a shared type used across multiple components (which should be in a shared types file).

## Next.js & React Best Practices

1.  **Use `proxy.ts` instead of `middleware.ts`**: The `middleware` file convention is deprecated. Use `proxy` instead to avoid confusion with Express.js middleware and clarify its purpose as a network boundary/proxy.
    - Run `npx @next/codemod@canary middleware-to-proxy .` to migrate.
2.  **`useSearchParams` requires Suspense**: When using `useSearchParams` in a Client Component, you MUST wrap the component (or the hook usage) in a `<Suspense>` boundary.
    - Failure to do so will opt the entire page into Client-Side Rendering (CSR), causing the page to be blank until JS loads.
    - **Fix**: Wrap the component using `useSearchParams` in `<Suspense fallback={<Loading />}>`.
    - Alternatively, for Server Components, use `await connection()` or `export const dynamic = 'force-dynamic'` (legacy) to opt into dynamic rendering.
3.  **Prevent Unescaped Entities**: When using single quotes or apostrophes in JSX text content, ALWAYS wrap the text in curly braces and backticks (template literals) or use HTML entities.
    - ❌ Bad: `<p>Don't do this</p>`
    - ✅ Good: `<p>{"Don't do this"}</p>` or `<p>Don&apos;t do this</p>`
    - **Preferred**: Use `{"Text here"}` pattern as it's more readable than HTML entities.

## Language & Localization

1.  **Default Language**: All generated text, comments, and documentation MUST be in **English**.
2.  **User Request Override**: Only use other languages (e.g., Indonesian) if explicitly requested by the user.
3.  **Code Consistency**: Variable names, function names, and commit messages MUST always be in **English**.
