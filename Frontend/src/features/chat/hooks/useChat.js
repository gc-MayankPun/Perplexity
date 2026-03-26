import { initializeSocketConnection } from "../service/chat.socket";

export const useChat = () => {
  return {
    initializeSocketConnection,
  };
};
