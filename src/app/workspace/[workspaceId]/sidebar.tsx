import UserButton from '@/features/auth/components/user-button';
import { WorkspaceSwitcher } from './workspace-switcher';
import { SidebarButton } from './sidebar-button';
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pahtname = usePathname();

  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-4 pt-[9px]">
      <WorkspaceSwitcher />

      <SidebarButton icon={Home} label="Home" isActive />
      <SidebarButton icon={MessagesSquare} label="Dm's" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />

      <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
