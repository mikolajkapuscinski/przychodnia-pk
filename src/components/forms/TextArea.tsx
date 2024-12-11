import { ChangeEventHandler } from "react";

interface TextAreaProps {
  value: string;
  className?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = (p: TextAreaProps) => {
  return (
    <textarea
      value={p.value}
      onChange={p.onChange}
      placeholder={p.placeholder}
      className={`w-full resize-none rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-orange ${p.className}`}
      rows={p.rows}
    />
  );
};
