import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const formatSpots = () => {
    if (!props.spots) return "no spots remaining";
    if (props.spots === 1) return "1 spot remaining";
    if (props.spots > 1) return `${props.spots} spots remaining`;
  }
  const dayClass = classNames("day-list__item", {
    "day-list__item--full": !props.spots,
    "day-list__item--selected": props.selected
  });

  return (
    <li className={dayClass} onClick={props.setDay} selected={props.selected} data-testid="day">
                                    {/* sorybook works w/o this selected attribute.. */}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light" data-testid="spots-remaining">{formatSpots()}</h3>
    </li>
  );
}