import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { interview, time } = props;
  return (
    <article className="appointment">
      <Header time={time}/>
      { props.interview ? 
      <Show student={interview.student} interviewer={interview.interviewer.name} 
      /> : 
      <Empty /> }

    </article>
  );
}