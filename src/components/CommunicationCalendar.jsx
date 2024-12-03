import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CommunicationCalendar = ({ communications = [] }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      <div>
        <h3 className="font-bold text-xl underline mt-5">
          Communications on {date.toLocaleDateString()}
        </h3>
        {communications.length > 0 ? (
          communications
            .filter((comm) => {
              const commDate = new Date(comm.date);
              return commDate.toDateString() === date.toDateString();
            })
            .map((comm, idx) => (
              <div key={idx}>
                <p>
                  {idx + 1}. {comm.type?.name || "Unknown Type"} - {comm.company?.name || "Unknown Company"} - {comm.notes || "No notes"}
                </p>
              </div>
            ))
        ) : (
          <p>No communications available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default CommunicationCalendar;
