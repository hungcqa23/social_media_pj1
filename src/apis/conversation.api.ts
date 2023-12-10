import { IMessageData, ISendMessageData } from 'src/types/conversation.type';
import http from 'src/utils/http';

export interface IGetConversations {
  message?: string;
  conversations?: IMessageData[];
  messages?: IMessageData[];
}

export interface ISendMessage {
  message?: string;
  data?: IMessageData;
}

export const retrieveConversations = async () => {
  const response = await http.get<IGetConversations>('/chat/conversations', {
    withCredentials: true
  });
  return response.data.conversations;
};

export const retrieveMessages = async (receiverId: string) => {
  const response = await http.get<IGetConversations>(
    `/chat/message/user/${receiverId}`,
    {
      withCredentials: true
    }
  );
  return response.data.messages;
};

export const sendMessage = async (body: ISendMessageData) => {
  const response = await http.post<ISendMessage>('/chat/send-message', body, {
    withCredentials: true
  });
  return response;
};

// export const conversationApi: ConversationApi = new ConversationApi();
