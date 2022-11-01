import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  const dayListItems = props.days.map(el => (
    <DayListItem
      key={el.id} name={el.name} spots={el.spots}
      selected={el.name === props.day} setDay={props.setDay} //DayList accepts setDay as prop..?
      //selected=(obj.name === props.day)
    />
  ));
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}