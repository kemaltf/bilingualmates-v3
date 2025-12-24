"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  BookOpen,
  User2,
  Settings,
  LogOut,
  Compass,
  ShoppingBag,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

export default function ClientLayout({
  children,
  right,
}: {
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  const t = useTranslations("sidebar");
  const [openMore, setOpenMore] = React.useState(false);
  const pathname = usePathname();
  const focusLesson = React.useMemo(() => {
    if (!pathname) return false;
    return pathname.startsWith("/learn/");
  }, [pathname]);

  const isPathPage = pathname === "/path";
  const isShopPage = pathname === "/shop";
  const isCoursePage = pathname === "/course";
  const isFullWidth = focusLesson || isPathPage || isShopPage || isCoursePage;

  const showMobileStats =
    pathname === "/learn" || pathname?.startsWith("/profile");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <SidebarProvider>
      {!focusLesson && (
        <Sidebar className="border-r  ">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>BILINGUALMATES</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname?.startsWith("/path")}
                    >
                      <Link href="/path" className="flex items-center gap-2">
                        <Compass className="size-4" />
                        <span>{t("path")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname?.startsWith("/learn")}
                    >
                      <Link href="/learn" className="flex items-center gap-2">
                        <BookOpen className="size-4" />
                        <span>{t("learn")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname?.startsWith("/profile")}
                    >
                      <Link href="/profile" className="flex items-center gap-2">
                        <User2 className="size-4" />
                        <span>{t("profile")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname?.startsWith("/shop")}
                    >
                      <Link href="/shop" className="flex items-center gap-2">
                        <ShoppingBag className="size-4" />
                        <span>{t("shop")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                          <span className="flex items-center gap-2">
                            <MoreHorizontal className="size-4" />
                            <span>{t("more")}</span>
                          </span>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-56">
                        <DropdownMenuItem asChild>
                          <Link
                            href="/settings"
                            className="flex items-center gap-2"
                          >
                            <Settings className="size-4" />
                            <span>{t("settings")}</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="size-4" />
                          <span>{t("logout")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      )}
      <main className="flex-1">
        <div
          className={cn(
            "w-full px-4 pb-20 md:pb-3",
            !isFullWidth && showMobileStats ? "pt-20 md:pt-3" : "pt-3",
            isFullWidth
              ? "max-w-[1024px] mx-auto"
              : "grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_360px] lg:justify-center gap-6"
          )}
        >
          <div className="min-w-0">{children}</div>
          {!isFullWidth && <div className="lg:w-[360px]">{right}</div>}
        </div>
        {!focusLesson && (
          <div className="fixed bottom-0 inset-x-0 z-100 md:hidden">
            <div className="bg-white border-t dark:bg-neutral-900 dark:border-neutral-800">
              <div className="max-w-[640px] mx-auto px-6 py-2 flex items-center justify-between">
                <Link
                  href="/learn"
                  aria-label="Learn"
                  className={cn(
                    buttonVariants({ variant: "blue", size: "icon" }),
                    "flex items-center justify-center"
                  )}
                >
                  <BookOpen className="size-5" />
                </Link>
                <Link
                  href="/shop"
                  aria-label="Shop"
                  className={cn(
                    buttonVariants({ variant: "blue", size: "icon" }),
                    "flex items-center justify-center"
                  )}
                >
                  <ShoppingBag className="size-5" />
                </Link>
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className={cn(
                    buttonVariants({ variant: "blue", size: "icon" }),
                    "flex items-center justify-center"
                  )}
                >
                  <User2 className="size-5" />
                </Link>
                <Button
                  variant="blue"
                  size="icon"
                  aria-label="More"
                  onClick={() => setOpenMore(true)}
                >
                  <MoreHorizontal className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
        <Sheet open={openMore} onOpenChange={setOpenMore}>
          <SheetContent side="bottom" className="pb-15">
            <SheetHeader>
              <SheetTitle>{t("more")}</SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <Settings className="size-5" />
                <div className="text-sm font-bold">{t("settings")}</div>
              </Link>
              <button
                className="flex items-center gap-3 rounded-xl border p-3 w-full"
                onClick={handleLogout}
              >
                <LogOut className="size-5" />
                <div className="text-sm font-bold">{t("logout")}</div>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </SidebarProvider>
  );
}
