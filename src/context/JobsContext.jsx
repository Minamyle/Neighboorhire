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

  // Create Job
  const createJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  // Update Status
  const updateJobStatus = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  // Accept Job
  const acceptJob = (jobId, artisanId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, artisanId: artisanId, status: "accepted" }
          : job,
      ),
    );
  };

  // Delete Job
  const deleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  // ── NEW: Rate a completed job ──────────────────────────────────────────────
  // Called from the customer side once a job is completed.
  // Adds `rating` (number 1–5) and `review` (string) to the job record.
  const rateJob = (jobId, { rating, review }) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              rating, // e.g. 4.5
              review: review ?? "", // optional text review
              ratedAt: new Date().toISOString(), // timestamp of when rated
            }
          : job,
      ),
    );
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        createJob,
        updateJobStatus,
        acceptJob,
        deleteJob,
        rateJob, // ← exposed here
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
