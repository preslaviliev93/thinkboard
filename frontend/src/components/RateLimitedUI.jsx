import React from "react";

const RateLimitedUI = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mt-10 p-6 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800">
        <h2 className="text-2xl font-bold mb-4">Rate Limit Exceeded</h2>
        <p className="mb-2">
          You have exceeded the allowed number of requests. Please wait a moment
          before trying again.
        </p>
        <p>If you believe this is an error, please contact support.</p>
      </div>
    </div>
  );
};

export default RateLimitedUI;
