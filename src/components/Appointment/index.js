import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const addCreate = () => {
    transition(CREATE);
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer
    }
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err.meesage));
  }
  // console.log(" ~~~ interview prop IN Appointment ", interview);
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
          onSave={save}
          onCancel={back}
      />
      )}
      {mode === SAVING && (
        <Status />
      )}
    </article>
  );
}
