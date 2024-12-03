import React from "react";
import { Cell } from "~/components/callendar/Cell";

interface DoctorAvailabilityProps {
    selectedDate: Date;
}

export const DoctorAvailability = (p: DoctorAvailabilityProps) => {
    const today = new Date();
    const isToday = p.selectedDate.toDateString() === new Date().toDateString();
    const hours = Array.from({ length: 8 }, (_, index) => 8 + index);

    const handleIsCellDisabled = (hour: number): boolean => {

        if (isToday && hour <= today.getHours()) {
            return true;
        }

        const todayStartOfDay = new Date(today.setHours(0, 0, 0, 0));
        const selectedDateStartOfDay = new Date(p.selectedDate.setHours(0, 0, 0, 0));
        const isPastDate = selectedDateStartOfDay < todayStartOfDay;

        if (isPastDate) {
            return true;
        } 
        return false;
    };

    return (
        <div className="grid grid-rows-8 gap-2">
            {hours.map((hour, index) => (
                <Cell
                    key={hour}
                    colIndex={0}
                    rowIndex={index}
                    isDisabled={handleIsCellDisabled(hour)}
                >
                    {`${hour < 10 ? "0" : ""}${hour}:00`}
                </Cell>
            ))}
        </div>
    );
};
