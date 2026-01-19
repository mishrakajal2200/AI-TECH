// import React from "react";
// import IssueCard from "../../components/analysis/IssueCard";
// import BarGraph from "../../components/charts/BarGraph";

// export default function AnalysisDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <h1 className="text-3xl font-bold mb-6">Analysis Dashboard</h1>

//       {/* Graph */}
//       <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
//         <BarGraph />
//       </div>

//       {/* Issues List */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <IssueCard
//           severity="High"
//           title="Duplicate Code Detected"
//           description="Found repeated logic in 3 different modules."
//         />

//         <IssueCard
//           severity="Medium"
//           title="Long Function"
//           description="A 92-line function appears in `authController.js`."
//         />
//       </div>
//     </div>
//   );
// }

// src/pages/Analysis/AnalysisDashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IssueCard from "../../components/analysis/IssueCard";
import BarGraph from "../../components/charts/BarGraph";
import { fetchAnalysisByProject, selectAnalysis } from "../../redux/slices/analysisSlice";

export default function AnalysisDashboard() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { loading, issues, status, error } = useSelector(selectAnalysis);

  // Poll backend every 5s until status === "completed"
  useEffect(() => {
    let interval;
    const fetchData = () => dispatch(fetchAnalysisByProject({ projectId }));

    fetchData(); // initial fetch
    interval = setInterval(fetchData, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [dispatch, projectId]);

  if (loading) return <p className="text-white p-4">Loading analysis...</p>;
  if (error) return <p className="text-red-400 p-4">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Analysis Dashboard</h1>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
        <BarGraph />
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Project Status: {status || "processing"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))
        ) : (
          <p className="text-gray-300">No issues detected yet.</p>
        )}
      </div>
    </div>
  );
}
