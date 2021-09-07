const updateReport = async (id, state) => {
  const response = await fetch(`http://localhost:8000/reports/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ticketState: state,
    }),
  });
  return response.json();
};

export default updateReport;
