const fetchReports = async () => {
  const response = await fetch('http://localhost:8000/reports');
  return response.json();
};

export default fetchReports;
