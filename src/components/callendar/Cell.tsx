import React from "react";

interface CellProps {
    colIndex: number;
    rowIndex: number;
    isDisabled: boolean;
    children: React.ReactNode;
}

export const Cell = ( p: CellProps ) => {
    return (
        <div
            key={`${p.colIndex}-${p.rowIndex}`}
            className={`text-sm border border-backgound p-2 text-center rounded-3xl ${
                p.isDisabled ? "bg-backgound text-gray-300 cursor-not-allowed" 
                : "bg-white hover:bg-aquamarine hover:text-white cursor-pointer"
            }`}
        >
            {p.children}
        </div>
    );
};
