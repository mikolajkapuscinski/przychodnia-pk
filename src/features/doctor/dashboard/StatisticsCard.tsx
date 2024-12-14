import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "~/components/cards/card";

const DoctorPatientChart: React.FC = () => {
  const data = [
    { name: "January", patients: 45 },
    { name: "February", patients: 62 },
    { name: "March", patients: 55 },
    { name: "April", patients: 78 },
    { name: "May", patients: 67 },
    { name: "June", patients: 89 },
  ];

  return (
    <Card title={"Patients in last half year"}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="patients" fill="#63A3B2" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DoctorPatientChart;
