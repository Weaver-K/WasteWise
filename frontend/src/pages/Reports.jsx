import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports") // your backend endpoint
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {reports.map(report => (
        <div key={report._id}>{report.title}</div>
      ))}
    </div>
  );
}
