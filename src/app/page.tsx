"use client";

import UserButton from "@/features/auth/components/user-button";
import useGetWorkspaces from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useEffect, useMemo } from "react";

function Home() {
  const [open, setOpen] = useCreateWorkSpaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspacesId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspacesId) {
      console.log("Redirect to workspace");
    } else if (!open) {
      setOpen(true);
    }
  }, [workspacesId, isLoading, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
}

export default Home;
