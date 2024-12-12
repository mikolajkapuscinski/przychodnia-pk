import { HTMLAttributes } from "react";

export const NavButtons: React.FC<React.HTMLAttributes<HTMLBaseElement>> = (p: HTMLAttributes<HTMLBaseElement>) => {
  return (
    <div className="flex w-1/3 gap-3 py-1">
      {p.children}
    </div>
  );
};
