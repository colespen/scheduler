import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
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

  const confirmHandler = () => {
    transition(CONFIRM);
  };
  // MAKE SEPARATE FUNCTION TO HANDLE CONFIRM PROMPT

  const deleteHandler = () => {
    transition(DELETE);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => console.log(err.meesage));
  };
  
  // console.log(" ~~~ interview prop IN Appointment ", interview);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={addCreate} />}
      {mode === SHOW && ( // "&& interview" as long as interview is truthy as well....*
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => console.log(" ~~~ onEdit ")}
          onDelete={confirmHandler}
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
      {mode === CONFIRM && (
        <Confirm message="Are you sure you'd like to delete?"
          onCancel={back}
          onConfirm={deleteHandler} />
      )}
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
    </article>
  );
}
