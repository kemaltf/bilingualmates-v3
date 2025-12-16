import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-4">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="text-neutral-600 max-w-md">
        There was an issue authenticating with the provider. Please try again.
      </p>
      <Link href="/login">
        <Button variant="blue" size="md" label="Back to Login" />
      </Link>
    </div>
  );
}
