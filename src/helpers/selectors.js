export function getAppointmentsForDay(state, day) {

  if (!Array.isArray(state.days)) return [];
  if (state.days === undefined) return [];
  if (state.days.length === 0) return [];

  const filteredAppointments = state.days.filter(d => d.name === day);
  if (filteredAppointments.length === 0) return [];

  const appointmentArray = filteredAppointments[0].appointments;

  return appointmentArray.map(id => {
    return state.appointments[id];
  });
}

export function getInterview(state, interview) {

  if (!interview) return null;

  const interviewerObj =
    state.interviewers[interview.interviewer];

  return { student: interview.student, interviewer: interviewerObj };
}


export function getInterviewersForDay(state, day) {

  if (!Array.isArray(state.days)) return [];
  if (state.days === undefined) return [];
  if (state.days.length === 0) return [];

  const filteredInterviewers = state.days.filter(d => d.name === day);

  if (filteredInterviewers.length === 0) return [];

  const interviewerArray = filteredInterviewers[0].interviewers;

  return interviewerArray.map(id => {

    return state.interviewers[id];

  });
}