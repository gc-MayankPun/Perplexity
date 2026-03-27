import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState, useRef } from "react";
import SettingsModal from "../components/SettingsModal";
import SearchOverlay from "../components/SearchOverlay";
import {
  IconAttach,
  IconChat,
  IconChevronLeft,
  IconChevronRight,
  IconMic,
  IconPlus,
  IconSearch,
  IconSend,
  IconSettings,
} from "../utils/icons.util.jsx";
import SbBtn from "../components/SidebarBtn";
import { RECENT_CHATS, SUGGESTIONS } from "../utils/constants.util";
import Message from "../components/Message";
import TypingIndicator from "../components/TypingIndicator";

const Dashboard = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);
  const { chats, currentChatId } = useSelector((state) => state.chat);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: `Hey${user?.name ? ` ${user.name}` : ""}! How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [focused, setFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowSettings(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content) return;

    setInput("");

    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);

    try {
      chat.handleSendMessage({ message: content, chatId: currentChatId });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 148) + "px";
  };
  const clearHistory = () =>
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Chat history cleared. How can I help you?",
      },
    ]);
  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .dash-root { font-family: 'DM Sans', sans-serif !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .msgs-scroll::-webkit-scrollbar { width: 4px; }
        .msgs-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 99px; }
      `}</style>

      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          history={messages}
        />
      )}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onClearHistory={clearHistory}
          user={user}
        />
      )}

      <div className="dash-root flex h-screen w-full bg-[#141414] text-neutral-100 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside
          className={`shrink-0 flex flex-col bg-[#0f0f0f] border-r border-white/5 py-4.5 gap-0.5 overflow-hidden transition-all duration-250 ease-in-out ${
            collapsed ? "w-15 px-2.5" : "w-63 px-3"
          }`}
        >
          {/* Logo + collapse toggle */}
          <div className="flex items-center justify-between px-1 pb-4 min-w-0">
            <span
              className={`font-[Syne,sans-serif] text-lg font-bold bg-linear-to-br from-violet-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-200 ${
                collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-40"
              }`}
            >
              ✦ Aether
            </span>
            <button
              onClick={() => setCollapsed((c) => !c)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="w-7 h-7 rounded-lg border border-white/[0.07] bg-white/4 text-neutral-500 hover:text-neutral-300 hover:bg-white/8 flex items-center justify-center shrink-0 transition-all cursor-pointer"
            >
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </button>
          </div>

          <SbBtn
            icon={<IconPlus />}
            label="New Chat"
            active
            collapsed={collapsed}
            title="New Chat"
          />
          <SbBtn
            icon={<IconSearch />}
            label="Search"
            collapsed={collapsed}
            title="Search chats"
            onClick={() => setShowSearch(true)}
          />

          <div className="h-px bg-white/5 my-2" />

          <div
            className={`text-[10px] font-semibold tracking-widest uppercase text-neutral-700 px-2.5 py-1 whitespace-nowrap overflow-hidden transition-opacity duration-150 ${collapsed ? "opacity-0" : "opacity-100"}`}
          >
            Recents
          </div>

          {Object.values(chats).map((chat) => (
            <SbBtn
              key={chat.id}
              icon={<IconChat />}
              label={chat.title}
              collapsed={collapsed}
              title={chat.title}
              onClick={() => openChat(chat.id)}
              dimLabel
            />
          ))}

          <div className="flex-1" />

          <SbBtn
            icon={<IconSettings />}
            label="Settings"
            collapsed={collapsed}
            title="Settings"
            onClick={() => setShowSettings(true)}
          />

          {/* User pill */}
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/4 overflow-hidden min-w-0 mt-0.5">
            <div className="w-7 h-7 rounded-full shrink-0 bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white">
              {initials}
            </div>
            <div
              className={`overflow-hidden min-w-0 transition-all duration-200 ${
                collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-40"
              }`}
            >
              <div className="text-[13px] font-medium text-neutral-300 whitespace-nowrap overflow-hidden text-ellipsis">
                {user?.name || "User"}
              </div>
              <div className="text-[11px] text-neutral-700 whitespace-nowrap">
                {user?.email || "Pro Plan"}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Chat area ── */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header */}
          <header className="flex items-center px-6 py-4 border-b border-white/5 shrink-0 gap-3">
            <div className="flex-1 flex items-center gap-3">
              <span className="font-[Syne,sans-serif] text-[15px] font-bold text-neutral-100">
                AI Assistant
              </span>
              <span className="text-[11px] text-neutral-600 bg-white/5 border border-white/[0.07] rounded-md px-2 py-0.5">
                claude-3.5
              </span>
            </div>
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] bg-white/3 text-neutral-500 text-[13px] hover:bg-white/6 hover:text-neutral-300 hover:border-white/10 transition-all cursor-pointer font-[inherit]"
            >
              <IconSearch /> Search chats
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 msgs-scroll scroll-smooth">
            {chats[currentChatId]?.messages.map((msg) => (
              <Message key={msg._id} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length <= 1 && (
            <div className="flex gap-2 flex-wrap px-6 pt-3 pb-4">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[12.5px] text-neutral-500 border border-white/8 rounded-full px-4 py-1.5 bg-transparent hover:border-violet-500/40 hover:text-violet-300 hover:bg-violet-500/[0.07] transition-all cursor-pointer font-[inherit] whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="px-6 pb-5 pt-3 shrink-0">
            <div
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                focused
                  ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)] bg-white/5"
                  : "border-white/8 bg-white/4"
              }`}
            >
              {/* Textarea row */}
              <div className="flex items-end px-3 pt-3 pb-2 gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  placeholder="Ask anything…"
                  className="flex-1 bg-transparent border-0 outline-none text-neutral-100 text-[14px] leading-snug resize-none min-h-5.5 max-h-37 font-[inherit] placeholder-neutral-700"
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoResize(e);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>

              {/* Bottom toolbar */}
              <div className="flex items-center justify-between px-2 pb-2.5 pt-2 border-t border-white/4">
                <div className="flex items-center gap-0.5">
                  <button
                    title="Attach file"
                    className="w-8 h-8 rounded-lg border-0 bg-transparent text-neutral-600 hover:bg-white/6 hover:text-neutral-400 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <IconAttach />
                  </button>
                  <button
                    title="Voice input"
                    className="w-8 h-8 rounded-lg border-0 bg-transparent text-neutral-600 hover:bg-white/6 hover:text-neutral-400 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <IconMic />
                  </button>
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white text-[13px] font-semibold cursor-pointer font-[inherit] hover:-translate-y-px hover:shadow-lg hover:shadow-violet-900/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none transition-all duration-150"
                >
                  <IconSend /> Send
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-neutral-800 mt-2">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
