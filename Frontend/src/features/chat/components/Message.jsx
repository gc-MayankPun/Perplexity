import React from 'react'

const Message = ({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex items-end gap-2.5 mb-5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      style={{ animation: "fadeUp 0.25s ease forwards" }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full shrink-0 bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-violet-900/40">
          AI
        </div>
      )}
      <div
        className={`max-w-[72%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
          isUser
            ? "bg-linear-to-br from-violet-600 to-indigo-700 text-white rounded-br-sm shadow-lg shadow-violet-900/30"
            : "bg-white/5 border border-white/[0.07] text-neutral-300 rounded-bl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

export default Message