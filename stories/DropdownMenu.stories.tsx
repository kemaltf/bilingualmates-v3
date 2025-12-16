import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, LogOut } from "lucide-react";

function MenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">
          <MoreHorizontal className="size-4" />
          <span>More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuItem>
          <Settings className="size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta: Meta<typeof MenuExample> = {
  title: "UI/menus/DropdownMenu",
  component: MenuExample,
};

export default meta;
type Story = StoryObj<typeof MenuExample>;

export const Default: Story = {};
