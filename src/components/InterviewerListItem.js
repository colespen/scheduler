import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,

  })

const setInterviewer = () => props.setInterviewer(props.id);

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}