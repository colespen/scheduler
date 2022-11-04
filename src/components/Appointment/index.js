import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { interview, time, interviewers } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const addCreate = () => {
    transition(CREATE);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={addCreate} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => console.log(" ~~~ onEdit ")}
          onDelete={() => console.log(" ~~~ onDelete ")}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onSave={() => console.log(" ~~~ onSave ")}
          onCancel={back}
      />
      )}
    </article>
  );
}
