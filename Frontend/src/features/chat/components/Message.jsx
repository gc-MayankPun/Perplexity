import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Message = ({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex items-end gap-2.5 mb-5 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
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
            : "text-neutral-300 rounded-bl-sm"
        }`}
      >
        {isUser ? (
          msg.content
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, children, ...props }) {
                return inline ? (
                  <code
                    className="bg-white/10 px-1 py-0.5 rounded text-[13px]"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre className="bg-black/40 p-3 rounded-lg overflow-x-auto mt-2">
                    <code {...props}>{children}</code>
                  </pre>
                );
              },
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              ul({ children }) {
                return <ul className="list-disc ml-5 mb-2">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal ml-5 mb-2">{children}</ol>;
              },
              strong({ children }) {
                return <strong className="font-semibold">{children}</strong>;
              },
            }}
          >
            {msg.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default Message;
