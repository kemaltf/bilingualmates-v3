import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  progress: number;
  onBack?: () => void;
};

export const OnboardingLayout = ({ children, progress, onBack }: Props) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="absolute top-0 left-0 right-0 z-10 h-16 w-full px-6 flex items-center gap-x-4 max-w-[1024px] mx-auto">
        {onBack ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </Button>
        ) : (
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </Link>
        )}
        <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-in-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1024px] mx-auto p-6 flex flex-col">
        {children}
      </main>
    </div>
  );
};
