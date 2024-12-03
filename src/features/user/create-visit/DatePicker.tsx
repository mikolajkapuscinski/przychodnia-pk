import React from "react";
import { SmallButton } from "~/components/forms/SmallButton";

interface DatePickerProps {
    selectedDate: Date;
    onDateChange: any;
}

export const DatePicker = (p: DatePickerProps) => {
    
    const handleDateChange = (direction: "prev" | "next") => {
        p.onDateChange((prevDate: Date) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + (direction === "next" ? 1 : -1));
            return newDate;
        });
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options).toUpperCase();
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between bg-backgound rounded-3xl mb-4">
                <SmallButton onClick={() => handleDateChange("prev")}>&#8249;</SmallButton>
                <span className="text-sm">{formatDate(p.selectedDate)}</span>
                <SmallButton onClick={() => handleDateChange("next")}>&#8250;</SmallButton>
            </div>
        </div>
    );
};
