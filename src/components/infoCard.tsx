import { HTMLAttributes } from "react";

export const InfoCard: React.FC<HTMLAttributes<HTMLBaseElement>> = (
  p: HTMLAttributes<HTMLBaseElement>,
) => {
  return (
    <div className="group flex w-[480px] cursor-pointer items-center gap-3 rounded-xl bg-orange p-3 capitalize text-black shadow-md">
      <div className="flex items-center justify-center p-1">
        <img className="h-5 w-5" src="/exc.png" alt=""></img>
      </div>
      <div>{p.children}</div>
    </div>
  );
};
