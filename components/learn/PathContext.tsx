"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CurriculumPath } from "@/lib/learn/types";
import { updateCurrentPath } from "@/lib/actions/course";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { paths } from "@/lib/learn/mock";

interface PathContextType {
  currentPath: CurriculumPath | null;
  setCurrentPath: (pathId: string) => Promise<void>;
  isLoading: boolean;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export function PathProvider({
  children,
  initialPathId,
}: {
  children: ReactNode;
  initialPathId?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("pathId");

  // Priority: URL param > initial prop > default first path
  const [currentPathId, setCurrentPathId] = React.useState<string | null>(
    selectedParam || initialPathId || paths[0]?.id || null
  );

  const [isLoading, setIsLoading] = React.useState(false);

  // Sync state if URL param changes
  React.useEffect(() => {
    if (selectedParam) {
      setCurrentPathId(selectedParam);
    }
  }, [selectedParam]);

  const currentPath = React.useMemo(
    () => paths.find((p) => p.id === currentPathId) ?? null,
    [currentPathId]
  );

  const handleSetCurrentPath = async (pathId: string) => {
    if (pathId === currentPathId) return;

    try {
      setIsLoading(true);
      // Optimistic update
      setCurrentPathId(pathId);

      await updateCurrentPath(pathId);
      toast.success("Path updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update path");
      console.error(error);
      // Revert on error
      setCurrentPathId(currentPathId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PathContext.Provider
      value={{
        currentPath,
        setCurrentPath: handleSetCurrentPath,
        isLoading,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}

export function usePath() {
  const context = useContext(PathContext);
  if (context === undefined) {
    throw new Error("usePath must be used within a PathProvider");
  }
  return context;
}
