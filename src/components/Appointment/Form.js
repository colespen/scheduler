import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || ""); //props.student!! is setting state!! (in edit)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //props.interviewer is ID (number)!
  const [error, setError] = useState("");

  const resetForm = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancelForm = () => {
    resetForm();
    props.onCancel();
  };
  // const onSubmit = () => {
  //   props.onSave(student, interviewer); // save fn, **** pass interviewer not setStudent!!!!!! wtf***
  // }
  // console.log(" ~~~ interviewer state ", interviewer);

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  }

  console.log(" ~~~~~~~~~ interviewer: ", interviewer)
  
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
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer} //interviewer state
          onChange={setInterviewer} //setState *** could this be the state interviewer????
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button confirm onClick={validate}>Save</Button>
          <Button danger onClick={cancelForm}>Cancel</Button>
        </section>
      </section>

    </main>
  );
}