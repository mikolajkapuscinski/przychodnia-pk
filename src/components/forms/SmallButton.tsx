interface SmallButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: any;
  children: string;
}

export const SmallButton = (p: SmallButtonProps) => {
  return (
    <button
      onClick={p.onClick}
      className="m-1 w-8 rounded-full bg-default-white p-1 font-bold text-orange"
    >
      {p.children}
    </button>
  );
};
