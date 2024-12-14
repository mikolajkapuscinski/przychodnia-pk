interface InputLabelProps {
  htmlFor: string;
  children: string;
}

export const InputLabel = (p: InputLabelProps) => {
  return (
    <label
      htmlFor={p.htmlFor}
      className="mb-1 ml-1 block text-sm font-medium text-default-black"
    >
      {p.children}
    </label>
  );
};
