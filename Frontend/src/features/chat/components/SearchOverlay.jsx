import React, { useEffect, useRef, useState } from "react";
import { RECENT_CHATS } from "../utils/constants.util";
import { IconChat, IconSearch } from "../utils/icons.util";

const SearchOverlay = ({ onClose, history }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = q.trim()
    ? history.filter((m) => m.content.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-140 bg-neutral-900 rounded-2xl border border-white/8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
          <span className="text-neutral-500 shrink-0">
            <IconSearch />
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your conversations…"
            className="flex-1 bg-transparent border-0 outline-none text-neutral-100 text-[15px] font-[inherit] placeholder-neutral-700"
          />
          <kbd className="text-[11px] text-neutral-600 border border-neutral-700 rounded-md px-1.5 py-0.5 shrink-0">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {q.trim() === "" && (
            <div className="px-5 pt-3 pb-2 text-[10px] font-semibold tracking-widest uppercase text-neutral-700">
              Recent chats
            </div>
          )}
          {(q.trim() === ""
            ? RECENT_CHATS.map((t) => ({ content: t }))
            : filtered
          ).map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 text-[14px] text-neutral-300 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={onClose}
            >
              <span className="text-neutral-700 shrink-0">
                <IconChat />
              </span>
              <span>
                {q.trim()
                  ? item.content
                      .split(new RegExp(`(${q})`, "gi"))
                      .map((part, j) =>
                        part.toLowerCase() === q.toLowerCase() ? (
                          <mark
                            key={j}
                            className="bg-violet-500/40 text-violet-300 rounded-sm not-italic"
                          >
                            {part}
                          </mark>
                        ) : (
                          part
                        ),
                      )
                  : item.content}
              </span>
            </div>
          ))}
          {q.trim() && filtered.length === 0 && (
            <div className="px-5 py-6 text-center text-[14px] text-neutral-600">
              No results for "{q}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchOverlay;
