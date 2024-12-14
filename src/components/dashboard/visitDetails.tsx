import React from "react";

export const VisitDetails: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="text-light-brown">
      {`Visit hour: ${date.getHours()}:${date.getMinutes()} - ${date.getHours() + 1}:${date.getMinutes()}`}
    </div>
  );
};
