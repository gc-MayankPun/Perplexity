import React from 'react'

const SbBtn = ({
  icon,
  label,
  active,
  collapsed,
  onClick,
  title,
  dimLabel,
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl w-full text-left border-0 cursor-pointer font-[inherit] text-[13.5px] transition-all duration-150 overflow-hidden whitespace-nowrap ${
      active
        ? "bg-violet-500/12 text-violet-300"
        : "bg-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
    }`}
  >
    <span className="shrink-0 w-5 flex items-center justify-center">
      {icon}
    </span>
    <span
      className={`overflow-hidden transition-all duration-200 ${
        collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-45"
      } ${dimLabel ? "text-neutral-600" : ""}`}
    >
      {label}
    </span>
  </button>
);

export default SbBtn