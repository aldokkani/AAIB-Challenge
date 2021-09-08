const fetchReports = async () => {
  const response = await fetch(
    `${process.env['REACT_APP_SERVER_URL']}/reports`
  );
  return response.json();
};

export default fetchReports;
