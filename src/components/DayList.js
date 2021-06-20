import React from "react";
import DaylistItem from "components/DayListItem";

export default function DayList(props) {
  const mappedList = props.days.map((day) => {
    return (
      <DaylistItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{mappedList}</ul>;
}
