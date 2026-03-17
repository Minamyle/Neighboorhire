// Import React so we can create React components
import React from "react";

// HowItWorkSection component explains how the platform works in 3 simple steps
const HowItWorkSection = () => {
  return (
    // Main container that controls the section width, background color, padding and spacing
    <div className="w-full bg-gray-50 px-6 md:px-12 lg:px-24 py-16">
      {/* ================= HEADER SECTION ================= */}
      {/* Displays the section title and a short description */}
      <div className="text-center mb-14">
        {/* Main section title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h1>

        {/* Supporting text explaining the simplicity of the process */}
        <p className="text-gray-600">Getting help is as easy as 1-2-3</p>
      </div>

      {/* ================= STEPS GRID ================= */}
      {/* Responsive grid layout displaying the 3 steps */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* ================= STEP 1 ================= */}
        {/* Card explaining the first step of the process */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          {/* Icon container for step 1 */}
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-5">
            {/* Step icon */}
            <img src="/images/list.png" alt="list" className="w-8" />
          </div>

          {/* Step title */}
          <h3 className="text-xl font-semibold mb-3">Post a Task</h3>

          {/* Step description */}
          <p className="text-gray-600">
            Describe what you need help with, from gardening to moving, and set
            your budget.
          </p>
        </div>

        {/* ================= STEP 2 ================= */}
        {/* Card explaining the second step */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          {/* Icon container */}
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-5">
            {/* Step icon */}
            <img src="/images/user-avatar.png" alt="user" className="w-8" />
          </div>

          {/* Step title */}
          <h3 className="text-xl font-semibold mb-3">Choose a Neighbor</h3>

          {/* Step explanation */}
          <p className="text-gray-600">
            Browse profiles, ratings, and reviews to pick the best person for
            the job.
          </p>
        </div>

        {/* ================= STEP 3 ================= */}
        {/* Card explaining the final step */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          {/* Icon container */}
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-5">
            {/* Step icon */}
            <img src="/images/checked.png" alt="checked" className="w-8" />
          </div>

          {/* Step title */}
          <h3 className="text-xl font-semibold mb-3">Get It Done</h3>

          {/* Final step explanation */}
          <p className="text-gray-600">
            Relax while the task is completed, then pay securely through the
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other pages
export default HowItWorkSection;
