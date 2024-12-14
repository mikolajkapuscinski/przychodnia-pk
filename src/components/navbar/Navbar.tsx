import { type HTMLAttributes } from "react";
import { Logo } from "./Logo";
import { NavButtons } from "./NavButtons";
import { Utilities } from "./Utilities";

export const Navbar: React.FC<HTMLAttributes<HTMLBaseElement>> = (
  p: HTMLAttributes<HTMLBaseElement>,
) => {
  return (
    <div className="flex max-h-16 w-full items-stretch justify-between px-8 py-1">
      <div className="w-1/3">
        <Logo />
      </div>
      <NavButtons>{p.children}</NavButtons>
      <Utilities />
    </div>
  );
};
