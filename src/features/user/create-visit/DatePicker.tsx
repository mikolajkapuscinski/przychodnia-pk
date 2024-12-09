import React from "react";
import { Button } from "~/components/forms/Button";

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
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options).toUpperCase();
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between rounded-3xl bg-backgound">
        <Button
          onClick={() => handleDateChange("prev")}
          variant={"secondary"}
          size={"xs"}
        >
          &#8249;
        </Button>
        <span className="text-sm">{formatDate(p.selectedDate)}</span>
        <Button
          onClick={() => handleDateChange("next")}
          variant={"secondary"}
          size={"xs"}
        >
          &#8250;
        </Button>
      </div>
    </div>
  );
};
