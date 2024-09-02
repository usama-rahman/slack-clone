"use client";

import { Hash } from "lucide-react";

const JoinPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-8 shadow-sm">
      <Hash color="#b139a7" />

      <div className="flex max-w-md flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-2xl font-bold">Join workspace</h1>
          <p className="text-sm text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;

// 9:12
