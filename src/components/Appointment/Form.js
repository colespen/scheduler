import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || ""); //props.student is setting state!! (in edit)
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
    props.onSave(student, interviewer); // save fn **** pass interviewer!!!!!! wtf***
  }
  // console.log(" ~~~ interviewer state ", interviewer);
  
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
            value={student} //student state
            onChange={(e => setStudent(e.target.value))} //setState with input! **** USE PREV? (REDUCER)
            //controlled component
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer} //interviewer state
          onChange={setInterviewer} //setState *** could this be the state interviewer????
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