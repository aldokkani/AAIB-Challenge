const updateReport = async (id, state) => {
  const response = await fetch(
    `${process.env['REACT_APP_SERVER_URL']}/reports/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketState: state,
      }),
    }
  );
  return response.json();
};

export default updateReport;
