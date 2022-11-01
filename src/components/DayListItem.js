import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (!props.spots) return "no spots remaining";
    if (props.spots === 1) return "1 spot remaining";
    if (props.spots > 1) return `${spots} spots remaining`;
  }
  const dayClass = classNames("day-list__item", {
    "day-list__item--full": !props.spots,
    "day-list__item--selected": props.selected
  });

  const setDay = () => props.setDay(props.name); // pass in props.name and return it for onClick!

  return (
    <li className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}