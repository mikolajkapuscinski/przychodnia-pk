import { ReactElement } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children?: string | ReactElement;
  onClick?: any;
  variant: "primary" | "secondary";
  size: "base" | "xs";
}

export const Button = (p: ButtonProps) => {
  const variantCss = {
    primary: "bg-orange text-white hover:bg-light-orange focus:ring-orange",
    secondary:
      "bg-white text-default-black hover:bg-orange hover:text-white focus:ring-white",
  }[p.variant];

  const sizeCss = {
    base: "rounded-3xl w-full py-2 px-4 focus:outline-none focus:ring-2",
    xs: "m-1 w-8 rounded-full p-1 font-bold text-orange",
  }[p.size];

  return (
    <button
      type={p.type}
      className={`${variantCss} ${sizeCss}`}
      onClick={p.onClick}
    >
      {p.children}
    </button>
  );
};
