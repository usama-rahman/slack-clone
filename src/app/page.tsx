"use client";

import UserButton from "@/features/auth/components/user-button";
import useGetWorkspaces from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkSpaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspacesId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspacesId) {
      router.replace(`/workspace/${workspacesId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspacesId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}

export default Home;
