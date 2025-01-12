import React, { type HTMLAttributes } from "react";

export const StatusAlert: React.FC<HTMLAttributes<HTMLDivElement>> = (p) => {
  return (
    <div
      className={`flex rounded-xl bg-aquamarine px-2 py-1 font-semibold uppercase text-default-white`}
    >
      {p.children}
    </div>
  );
};
