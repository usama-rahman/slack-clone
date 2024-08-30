import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Doc } from '../../../../convex/_generated/dataModel';

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>;
}

export const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  return (
    <div className="flex h-[49px] items-center justify-between gap-0.5 px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            className="w-auto overflow-hidden p-1.5 text-lg font-semibold"
            size="sm"
          >
            <span>{workspace.name}</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};
