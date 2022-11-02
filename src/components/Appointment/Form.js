import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //props.interviewer is ID (number)!
  const resetForm = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancelForm = () => {
    resetForm();
    props.onCancel();
  };
  const onSubmit = () => {
    props.onSave(student, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">

      <section className="appointment__card-left">
        <form autoComplete="off"
        onSubmit={e => e.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} //props.student reference
            onChange={(e => setStudent(e.target.value))}
            //controlled component
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer} //interviewer = props.interviewer reference*
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button confirm onClick={onSubmit}>Save</Button>
          <Button danger onClick={cancelForm}>Cancel</Button>
        </section>
      </section>

    </main>
  );
}