interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: string;
  onClick?: any;
}

export const Button = (p: ButtonProps) => {
  return (
    <button
      type={p.type}
      className="w-full rounded-3xl bg-orange py-2 text-white hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-orange"
      onClick={p.onClick}
    >
      {p.children}
    </button>
  );
};
