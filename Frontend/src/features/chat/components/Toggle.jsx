import React from "react";

const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative w-10 h-5.5 rounded-full shrink-0 transition-all duration-200 cursor-pointer border-0 p-0 ${
      value ? "bg-linear-to-br from-violet-600 to-indigo-700" : "bg-white/10"
    }`}
  >
    <span
      className={`absolute top-0.75 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
        value ? "left-5.25" : "left-0.75"
      }`}
    />
  </button>
);

export default Toggle;
