import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  const dayListItems = props.days.map(day => (
    <DayListItem
      key={day.id} 
      name={day.name} 
      spots={day.spots}
      selected={day.name === props.value} //selected equals (obj.name === props.day)
      setDay={() => props.onChange(day.name)} 
      //DayList accepts setDay as prop and passes it to DayListItem 
    />
  ));
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}