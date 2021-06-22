import React from "react";
import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Form from "components/Appointments/Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/Appointments/Status";
import Confirm from "components/Appointments/Confirm";
import Error from "components/Appointments/Error";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    if (interviewer === null) {
      return transition(ERROR_SAVE)
    }


    transition(SAVING);
    
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  };

  const confirmDelete = () => {
    transition(CONFIRMING);
  };

  const deleteAppointment = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  const onEdit = () => {
    transition(EDIT);
  };
  return (
    <>
      <article className="appointment"></article>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back(EMPTY);
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment. Please select a interviewer." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={back} />
      )}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviews={props.interviews}
          interviewer={props.selected}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CONFIRMING && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={onEdit}
        />
      )}
    </>
  );
}
