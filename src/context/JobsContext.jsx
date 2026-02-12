import { createContext, useContext, useEffect, useState } from "react";
import { DUMMY_JOBS } from "../config/dummy-jobs-data";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? JSON.parse(stored) : DUMMY_JOBS;
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Standard status update
  const updateJobStatus = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  // SIMPLE FIX: Assigns artisan ID and sets status to 'accepted'
  const acceptJob = (jobId, artisanId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, artisanId: artisanId, status: "accepted" }
          : job,
      ),
    );
  };

  return (
    <JobsContext.Provider value={{ jobs, updateJobStatus, acceptJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
