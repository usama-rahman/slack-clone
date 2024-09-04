"use client";

import { Provider } from "jotai";

interface JotaiProvierProps {
  children: React.ReactNode;
}

export const JotaiProvier = ({ children }: JotaiProvierProps) => {
  return <Provider>{children}</Provider>;
};
