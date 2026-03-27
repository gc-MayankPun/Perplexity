import React from 'react'

const StyledSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-neutral-800 border border-white/10 rounded-lg text-neutral-300 text-[13px] px-3 py-1.5 outline-none cursor-pointer font-[inherit]"
  >
    {options.map((o) => (
      <option key={o} value={o} className="bg-neutral-900">
        {o}
      </option>
    ))}
  </select>
);


export default StyledSelect