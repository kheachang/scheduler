import React from "react";
import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Form from "components/Appointments/Form";
import useVisualMode from "../../hooks/useVisualMode";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <>
      <article className="appointment"></article>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() =>  transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back(EMPTY)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </>
  )};
