interface InputBoxProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export const InputBox = (p: InputBoxProps) => {
  return (
    <input
      type={p.type}
      id={p.id}
      name={p.name}
      value={p.value}
      onChange={p.onChange}
      required={p.required}
      placeholder={p.placeholder}
      className="w-full rounded-3xl border border-default-gray px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
    />
  );
};
