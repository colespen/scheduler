//state parameter is the json from API

export function getAppointmentsForDay(state, day) {

  if (!Array.isArray(state.days)) return [];
  if (state.days === undefined) return [];
  if (state.days.length === 0) return [];

  const filteredAppointments = state.days.filter(d => d.name === day);
  if (filteredAppointments.length === 0) return [];

  const appointmentArray = filteredAppointments[0].appointments;

  return appointmentArray.map(id => {
   return state.appointments[id]; // return the obj's with current element #!!!
  });
}

export function getInterview(state, interview) {
  // interview parameter is {student:... interviewer:...} obj
  if (!interview) return null;
  
  const interviewerObj = 
  state.interviewers[interview.interviewer]; // [ this is the interviewer id]
  // interviewer information (3 properties)

  return { student: interview.student, interviewer: interviewerObj };
}