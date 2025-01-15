import React, { useState } from "react";
import { Cell } from "~/components/callendar/Cell";
import { Button } from "~/components/forms/Button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface DoctorAvailabilityProps {
  selectedDate: Date;
  doctorId: string;
}

export const DoctorAvailability = (p: DoctorAvailabilityProps) => {
  const today = new Date();
  const isToday = p.selectedDate.toDateString() === new Date().toDateString();
  const hours = Array.from({ length: 8 }, (_, index) => 8 + index);

  const { data: sessionData } = useSession();
  const newVisit = api.visit.createVisit.useMutation();

  const router = useRouter();

  const handleIsCellDisabled = (hour: number): boolean => {
    if (isToday && hour <= today.getHours()) {
      return true;
    }

    const todayStartOfDay = new Date(today.setHours(0, 0, 0, 0));
    const selectedDateStartOfDay = new Date(
      p.selectedDate.setHours(0, 0, 0, 0),
    );
    const isPastDate = selectedDateStartOfDay < todayStartOfDay;

    if (isPastDate) {
      return true;
    }
    return false;
  };

  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const handleCellClick = (hour: number) => {
    if (selectedHour === hour) {
      setSelectedHour(null);
    } else {
      setSelectedHour(hour);
    }
  };

  const createVisit = async () => {
    if (selectedHour !== null && sessionData?.user.id) {
      const visitTime = new Date(p.selectedDate.setHours(selectedHour));

      try {
        await newVisit.mutateAsync({
          date: visitTime,
          patientId: sessionData.user.id,
          doctorId: p.doctorId,
          title: "New Appointment",
        });

        router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="grid grid-rows-8 gap-2">
      {hours.map((hour, index) => (
        <Cell
          key={hour}
          colIndex={0}
          rowIndex={index}
          isDisabled={handleIsCellDisabled(hour)}
          isSelected={selectedHour === hour}
          onClick={() => handleCellClick(hour)}
        >
          {`${hour < 10 ? "0" : ""}${hour}:00`}
        </Cell>
      ))}
      {selectedHour !== null && (
        <div className="mt-2">
          <Button onClick={createVisit} variant={"primary"} size={"base"}>
            Book
          </Button>
        </div>
      )}
    </div>
  );
};
