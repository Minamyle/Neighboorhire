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

  // --- NEW: Create Job Function ---
  const createJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]); // Adds new job to the top of the list
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  const acceptJob = (jobId, artisanId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, artisanId: artisanId, status: "accepted" }
          : job,
      ),
    );
  };

  // Optional: Remove a job if a customer cancels
  const deleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        createJob,
        updateJobStatus,
        acceptJob,
        deleteJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
};
