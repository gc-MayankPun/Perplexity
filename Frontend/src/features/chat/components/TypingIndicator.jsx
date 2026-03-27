import React from "react";

const TypingIndicator = () => (
  <div className="flex items-end gap-2.5 mb-5">
    <div className="w-8 h-8 rounded-full shrink-0 bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-violet-900/40">
      AI
    </div>
    <div className="bg-white/5 border border-white/[0.07] rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-neutral-500 inline-block animate-bounce"
            style={{
              animationDelay: `${i * 0.18}s`,
              animationDuration: "0.9s",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default TypingIndicator;
