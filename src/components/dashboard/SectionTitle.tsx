import { type ReactElement } from "react";

interface SectionTitleProps {
  children: string | ReactElement;
  results?: number;
  onclick?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = (
  p: SectionTitleProps,
) => {
  return (
    <div className="mb-4 flex items-center">
      <h2 className="mr-3 text-2xl font-bold">{p.children}</h2>
      {p.results && p.results ? (
        <a
          onClick={p.onclick}
          className="mt-1 cursor-pointer text-xs font-semibold text-aquamarine"
        >
          All results ({p.results}) &#8250;
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};
