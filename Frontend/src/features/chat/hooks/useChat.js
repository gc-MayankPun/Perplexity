import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import {
  createNewChat,
  addNewMessage,
  addMessages,
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;
    dispatch(
      createNewChat({
        chatId: chat._id,
        title: chat.title,
      }),
    );
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: message,
        role: "user",
      }),
    );
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: aiMessage.content,
        role: aiMessage.role,
      }),
    );
    dispatch(setCurrentChatId(chat._id));
    dispatch(setLoading(false));
  }

  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    dispatch(
      setChats(
        data.chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId) {
    const data = await getMessages(chatId);

    const formattedMessages = data.messages.map((msg) => ({
      content: msg.content,
      role: msg.role,
    }));
    dispatch(
      addMessages({
        chatId,
        messages: formattedMessages,
      }),
    );
    dispatch(setCurrentChatId(chatId));
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
