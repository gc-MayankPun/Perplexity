import React, { useState } from "react";
import { LANGUAGES, MODEL_DESC, MODELS } from "../utils/constants.util";
import {
  IconBell,
  IconCpu,
  IconShield,
  IconUser,
} from "../utils/icons.util.jsx";
import SettingsRow from "./SettingsRow";
import StyledSelect from "./StyledSelect";
import Toggle from "./Toggle";

const SettingsModal = ({ onClose, onClearHistory, user }) => {
  const [activeTab, setActiveTab] = useState("account");
  const [model, setModel] = useState("Claude 3.5 Sonnet");
  const [language, setLanguage] = useState("English");
  const [sounds, setSounds] = useState(true);
  const [streaming, setStreaming] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(false);
  const [emailDigest, setEmailDigest] = useState(false);
  const [trainData, setTrainData] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const tabs = [
    { id: "account", label: "Account", icon: <IconUser /> },
    { id: "model", label: "AI Model", icon: <IconCpu /> },
    { id: "notifs", label: "Notifications", icon: <IconBell /> },
    { id: "privacy", label: "Privacy", icon: <IconShield /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-155 max-h-[82vh] bg-neutral-900 rounded-2xl border border-white/8 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/6">
          <span className="text-[16px] font-bold text-neutral-100 tracking-tight">
            Settings
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/6 text-neutral-500 hover:text-neutral-300 hover:bg-white/10 flex items-center justify-center transition-all border-0 cursor-pointer"
          >
            <IconX />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Tab list */}
          <div className="w-39.5 shrink-0 border-r border-white/5 p-3 flex flex-col gap-0.5 overflow-y-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium text-left w-full transition-all border-0 cursor-pointer font-[inherit] ${
                  activeTab === t.id
                    ? "bg-violet-500/[0.14] text-violet-300"
                    : "bg-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
                }`}
              >
                <span className="shrink-0">{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            {/* Account */}
            {activeTab === "account" && (
              <>
                <div className="flex items-center gap-4 pb-5 mb-1 border-b border-white/5">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-[18px] font-bold text-white shrink-0">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-neutral-100">
                      {user?.name || "User"}
                    </div>
                    <div className="text-[12px] text-neutral-600 mt-0.5">
                      {user?.email || "user@example.com"}
                    </div>
                  </div>
                </div>
                <SettingsRow label="Display name" sub="Shown in conversations">
                  <input
                    defaultValue={user?.name || "User"}
                    className="bg-neutral-800 border border-white/10 rounded-lg text-neutral-300 text-[13px] px-3 py-1.5 outline-none w-36 font-[inherit]"
                  />
                </SettingsRow>
                <SettingsRow label="Email" sub="Your login email">
                  <span className="text-[13px] text-neutral-600">
                    {user?.email || "—"}
                  </span>
                </SettingsRow>
                <SettingsRow
                  label="Interface language"
                  sub="Language for the UI"
                >
                  <StyledSelect
                    value={language}
                    onChange={setLanguage}
                    options={LANGUAGES}
                  />
                </SettingsRow>
                <SettingsRow
                  label="Save chat history"
                  sub="Store conversations across sessions"
                >
                  <Toggle value={saveHistory} onChange={setSaveHistory} />
                </SettingsRow>
              </>
            )}

            {/* AI Model */}
            {activeTab === "model" && (
              <>
                <SettingsRow
                  label="Active model"
                  sub="Model used for all new chats"
                >
                  <StyledSelect
                    value={model}
                    onChange={setModel}
                    options={MODELS}
                  />
                </SettingsRow>
                <SettingsRow
                  label="Streaming responses"
                  sub="Show reply word-by-word as it generates"
                >
                  <Toggle value={streaming} onChange={setStreaming} />
                </SettingsRow>
                <SettingsRow
                  label="Response length"
                  sub="Preferred answer verbosity"
                >
                  <StyledSelect
                    value="Balanced"
                    onChange={() => {}}
                    options={["Concise", "Balanced", "Detailed"]}
                  />
                </SettingsRow>
                <SettingsRow
                  label="Default format"
                  sub="How responses are formatted"
                >
                  <StyledSelect
                    value="Markdown"
                    onChange={() => {}}
                    options={["Plain text", "Markdown", "Auto"]}
                  />
                </SettingsRow>
                <div className="mt-4 p-4 rounded-xl bg-violet-500/[0.07] border border-violet-500/20">
                  <div className="text-[12px] text-violet-400 font-semibold mb-1">
                    About {model}
                  </div>
                  <div className="text-[12px] text-neutral-500 leading-relaxed">
                    {MODEL_DESC[model]}
                  </div>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeTab === "notifs" && (
              <>
                <SettingsRow
                  label="Message sounds"
                  sub="Play a sound when a reply arrives"
                >
                  <Toggle value={sounds} onChange={setSounds} />
                </SettingsRow>
                <SettingsRow
                  label="Desktop notifications"
                  sub="Browser push notifications for new replies"
                >
                  <Toggle value={desktopNotif} onChange={setDesktopNotif} />
                </SettingsRow>
                <SettingsRow
                  label="Weekly email digest"
                  sub="Summary of your conversations by email"
                >
                  <Toggle value={emailDigest} onChange={setEmailDigest} />
                </SettingsRow>
              </>
            )}

            {/* Privacy */}
            {activeTab === "privacy" && (
              <>
                <SettingsRow
                  label="Save chat history"
                  sub="Store conversations on the server"
                >
                  <Toggle value={saveHistory} onChange={setSaveHistory} />
                </SettingsRow>
                <SettingsRow
                  label="Help improve the AI"
                  sub="Allow anonymised chats for model training"
                >
                  <Toggle value={trainData} onChange={setTrainData} />
                </SettingsRow>
                <SettingsRow
                  label="Clear all chat history"
                  sub="Permanently delete every conversation"
                >
                  {confirmClear ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmClear(false)}
                        className="text-[12px] px-3 py-1.5 rounded-lg border border-white/10 bg-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer font-[inherit] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onClearHistory();
                          setConfirmClear(false);
                          onClose();
                        }}
                        className="text-[12px] px-3 py-1.5 rounded-lg border-0 bg-red-600 hover:bg-red-500 text-white font-semibold cursor-pointer font-[inherit] transition-colors"
                      >
                        Yes, clear all
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmClear(true)}
                      className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/8 text-red-400 hover:bg-red-500/20 cursor-pointer font-[inherit] transition-colors"
                    >
                      <IconTrash /> Clear history
                    </button>
                  )}
                </SettingsRow>
                <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/5 text-[12px] text-neutral-700 leading-relaxed">
                  Conversations are encrypted in transit. Saved chats are only
                  accessible by your account and are never shared with third
                  parties.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-3 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-white/10 bg-transparent text-neutral-400 text-[13px] cursor-pointer font-[inherit] hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border-0 bg-linear-to-br from-violet-600 to-indigo-600 text-white text-[13px] font-semibold cursor-pointer font-[inherit] hover:opacity-90 transition-opacity"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
