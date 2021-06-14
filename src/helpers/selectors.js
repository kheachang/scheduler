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
    // console.log(interviewer);
    if (Number(interviewer) === interviewerID) {
      result.interviewer = state.interviewers[interviewer];
    }
  }
  return result;
}

export function getInterviewersForDay(state, dayName) {
  const validDayNames = state.days.map(dayObj => dayObj.name);
  if (!dayName || !validDayNames.includes(dayName)) return [];

  const todayObj = state.days.filter(dayObj => dayObj.name === dayName)[0];
  const interviewersObj = todayObj.interviewers.map(
    interId => state.interviewers[interId]
  );
  return interviewersObj;
}
