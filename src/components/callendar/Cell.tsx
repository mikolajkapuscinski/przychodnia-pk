import React from "react";

interface CellProps {
  colIndex: number;
  rowIndex: number;
  isDisabled: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Cell = (p: CellProps) => {
  return (
    <div
      key={`${p.colIndex}-${p.rowIndex}`}
      onClick={!p.isDisabled ? p.onClick : undefined}
      className={`rounded-3xl border border-backgound p-2 text-center text-sm ${
        p.isDisabled
          ? "cursor-not-allowed bg-backgound text-gray-300"
          : p.isSelected
            ? "cursor-pointer bg-aquamarine text-white"
            : "cursor-pointer bg-white hover:bg-backgound"
      }`}
    >
      {p.children}
    </div>
  );
};
