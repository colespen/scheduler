import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  const dayListItems = props.days.map(el => (
    <DayListItem
      key={el.id} name={el.name} spots={el.spots}
      selected={el.name === props.day} setDay={props.setDay} 
      //selected=(obj.name === props.day)
      //DayList accepts setDay as prop and passes it to DayListItem 
    />
  ));
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}