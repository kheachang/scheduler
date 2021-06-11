export function getAppointmentsForDay(state, day) {
  const validDays = state.days.map((day) => day.name);
  if (!validDays.includes(day)) {
    return [];
  }

  return state.days
    .filter((appointment) => appointment.name === day)[0]
    .appointments.map((apptId) => state.appointments[apptId]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  const interviewerID = interview.interviewer;

  result.student = interview.student;

  for (const interviewer in state.interviewers) {
    console.log(interviewer);
    if (Number(interviewer) === interviewerID) {
      result.interviewer = state.interviewers[interviewer];
    }
  }
  return result;
}
