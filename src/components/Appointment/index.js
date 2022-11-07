import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const addCreate = () => {
    transition(CREATE);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.log(err.meesage));
  };

  const deleteHandler = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => console.log(err.meesage));
  };
  // console.log(" ~~~ interview prop IN Appointment ", interview);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={addCreate} />}
      {mode === SHOW && interview && ( //as long as interview is truthy as well....*
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => console.log(" ~~~ onEdit ")}
          onDelete={deleteHandler}
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
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
    </article>
  );
}
