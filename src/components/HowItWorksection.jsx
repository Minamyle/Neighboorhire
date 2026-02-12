import React from "react";

const HowItWorkSection = () => {
  return (
    <div className="w-full bg-gray-50 px-6 md:px-12 lg:px-60 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h1>
        <p className="text-gray-600">Getting help is as easy as 1-2-3</p>
      </div>

      {/* Steps */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-5">
            <img src="/images/list.png" alt="list" className="w-8" />
          </div>

          <h3 className="text-xl font-semibold mb-3">Post a Task</h3>

          <p className="text-gray-600">
            Describe what you need help with, from gardening to moving, and set
            your budget.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-5">
            <img src="/images/user-avatar.png" alt="user" className="w-8" />
          </div>

          <h3 className="text-xl font-semibold mb-3">Choose a Neighbor</h3>

          <p className="text-gray-600">
            Browse profiles, ratings, and reviews to pick the best person for
            the job.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-5">
            <img src="/images/checked.png" alt="checked" className="w-8" />
          </div>

          <h3 className="text-xl font-semibold mb-3">Get It Done</h3>

          <p className="text-gray-600">
            Relax while the task is completed, then pay securely through the
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkSection;
