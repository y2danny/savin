import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  return <>{children}</>;
}