import React, { type HTMLAttributes } from "react";

export const SoonAlert: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`rounded-xl bg-aquamarine px-2 py-1 font-semibold uppercase text-default-white ${className}`}
    >
      soon
    </div>
  );
};
