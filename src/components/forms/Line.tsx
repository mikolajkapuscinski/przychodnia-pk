import { type HTMLAttributes } from "react";

export const Line: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <hr
      {...rest}
      className={`my-4 border-t border-default-gray ${className}`}
    />
  );
};
