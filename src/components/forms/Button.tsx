import { type ReactElement } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children?: string | ReactElement | any;
  onClick?: any;
  variant: "primary" | "secondary" | "blue" | "minimalistic";
  size: "base" | "xs";
}

export const Button = (p: ButtonProps) => {
  const variantCss = {
    primary: "bg-orange text-white hover:bg-light-orange focus:ring-orange",
    secondary:
      "bg-white text-default-black hover:bg-orange hover:text-white focus:ring-white",
    blue: "bg-aquamarine text-white hover:bg-[#90c5d1] hover:text-white focus:ring-white",
    minimalistic: "text-orange bg-transparent m-0 w-6",
  }[p.variant];

  const sizeCss = {
    base: "rounded-3xl w-full py-2 px-4 focus:outline-none focus:ring-2",
    xs: "m-1 w-8 rounded-full p-1 font-bold text-orange",
  }[p.size];

  return (
    <button
      type={p.type}
      className={`${variantCss} ${sizeCss} ${p.className}`}
      onClick={p.onClick}
    >
      {p.children}
    </button>
  );
};
