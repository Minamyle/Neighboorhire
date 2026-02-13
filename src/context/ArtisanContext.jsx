import { createContext, useContext, useState } from "react";
import { DUMMY_JOBS } from "../config/dummy-jobs-data";

const ArtisanContext = createContext();
const data = DUMMY_JOBS;
function ArtisanProvider({ children }) {
  const [postedJobs, setPostedJobs] = useState(data);

  const updateJobStatus = (jobId, newStatus) => {
    setPostedJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  // Inside ArtisanProvider in ArtisanContext.js
  const stats = {
    totalEarnings: postedJobs
      .filter((job) => job.status === "completed")
      .reduce((sum, job) => {
        // Remove currency prefix and commas before adding
        const amount = parseFloat(job.budget.replace(/[^0-9.]/g, ""));
        return sum + amount;
      }, 0),
    completedCount: postedJobs.filter((job) => job.status === "completed")
      .length,
    pendingCount: postedJobs.filter((job) => job.status === "pending").length,
    inProgressCount: postedJobs.filter((job) => job.status === "in-progress")
      .length,
  };

  return (
    <ArtisanContext.Provider value={{ postedJobs, updateJobStatus, stats }}>
      {children}
    </ArtisanContext.Provider>
  );
}

//creating a custom hook

function useData() {
  const context = useContext(ArtisanContext);
  if (context === undefined) {
    console.error("useData cannot be accessed outside its provider");
  }
  return context;
}

export { useData, ArtisanProvider };
