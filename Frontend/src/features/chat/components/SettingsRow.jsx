import React from 'react'

const SettingsRow = ({ label, sub, children }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/4">
    <div className="pr-4 min-w-0">
      <div className="text-[13.5px] text-neutral-300 font-medium">{label}</div>
      {sub && <div className="text-[12px] text-neutral-600 mt-0.5">{sub}</div>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);
 
export default SettingsRow