# Authentication Implementation Guide

This document details the implementation of Authentication in **BilingualMates V3**, covering both **Email/Password** login and **Google OAuth** (Sign in with Google).

The project uses **Supabase Auth** combined with **Next.js App Router** and **Server-Side Rendering (SSR)** via the `@supabase/ssr` package. This ensures secure, cookie-based session management.

---

## 1. Overview

- **Auth Provider**: Supabase
- **Framework**: Next.js 15+ (App Router)
- **Strategy**: PKCE (Proof Key for Code Exchange) Flow for server-side auth.
- **Session Storage**: HttpOnly Cookies (managed by `@supabase/ssr`).
- **Route Protection**: `middleware.ts`

---

## 2. Prerequisites & Configuration

### A. Environment Variables

Ensure the following variables are set in your `.env.local` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### B. Supabase Dashboard Setup

1.  Go to **Authentication > URL Configuration**.
2.  Set **Site URL** to `http://localhost:3000` (for development).
3.  **IMPORTANT:** Add your production URLs to **Redirect URLs**:
    - `http://localhost:3000/auth/callback`
    - `https://bilingualmates.com/auth/callback` (and any other domains like www)
    - `https://your-vercel-url.app/auth/callback` (for preview deployments)

### C. Google Cloud Console Setup (for OAuth)

1.  Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2.  Go to **APIs & Services > Credentials**.
3.  Create an **OAuth 2.0 Client ID** (Web Application).
4.  **Authorized JavaScript origins**: `http://localhost:3000`
5.  **Authorized redirect URIs**: `https://<your-project-ref>.supabase.co/auth/v1/callback`
6.  Copy the **Client ID** and **Client Secret**.
7.  Go back to **Supabase Dashboard > Authentication > Providers > Google** and paste the Client ID and Secret. Ensure the provider is **Enabled**.

---

## 3. Implementation Details

### A. Supabase Client Initialization

We use two different clients depending on the context (Client Component vs. Server Component/Action).

**1. Client-Side (`lib/supabase/client.ts`)**
Used in Client Components (e.g., Login forms). We enforce the **PKCE flow** here to ensure a `code` is returned instead of a token hash.

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce", // CRITICAL: Enforces code exchange flow
    },
  }
);
```

**2. Server-Side (`lib/supabase/server.ts`)**
Used in Server Components, Server Actions, and API Routes to access cookies.

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored in Server Components
          }
        },
      },
    }
  );
}
```

### B. Auth Callback Route (`app/auth/callback/route.ts`)

This is the heart of the PKCE flow. When a user logs in via Google, they are redirected here with a `?code=...` query parameter. This route exchanges that code for a session cookie.

```typescript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/learn";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(/* ... config ... */);

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Handle errors
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
```

### C. Login Page (`app/(public)/login/page.tsx`)

**Google Login:**
We call `signInWithOAuth` and explicitly point the `redirectTo` to our callback route.

```typescript
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`, // Redirects to our server route
    },
  });
};
```

**Email/Password Login:**
Standard `signInWithPassword` call.

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
if (!error) window.location.assign("/learn");
```

### D. Middleware Protection (`middleware.ts`)

The middleware ensures that:

1.  **Unauthenticated users** cannot access protected routes (e.g., `/learn`, `/profile`).
2.  **Authenticated users** cannot access auth pages (e.g., `/login`, `/register`).

```typescript
// Simplified logic
if (user && isAuthPage)
  return NextResponse.redirect(new URL("/learn", request.url));
if (!user && isProtectedPage)
  return NextResponse.redirect(new URL("/login", request.url));
```

---

## 4. Troubleshooting

### "Auth Code Error" or 404 on Callback

- **Cause**: The `flowType` might not be set to `pkce` in `client.ts`, causing Google to return a hash (`#access_token`) instead of a query param (`?code`).
- **Fix**: Ensure `flowType: "pkce"` is set in `lib/supabase/client.ts` and `app/auth/callback/route.ts` exists.

### Redirect Loop

- **Cause**: Middleware logic might be conflicting.
- **Fix**: Check `middleware.ts` to ensure it doesn't redirect logged-in users back to login, or vice-versa, in an infinite loop.

### "Conflicting route and page"

- **Cause**: Having both `page.tsx` and `route.ts` in `app/auth/callback/`.
- **Fix**: Delete `page.tsx`. The callback should be a server API route (`route.ts`).
