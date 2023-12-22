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

export const callVideo = async (body: ISendMessageData) => {
  const response = await http.post<ISendMessage>('/chat/call-video', body, {
    withCredentials: true
  });
  return response;
};

export const callVideoReq = async (body: ISendMessageData) => {
  const response = await http.post<ISendMessage>(
    '/chat/call-video-socket',
    body,
    {
      withCredentials: true
    }
  );
  return response;
};

export const callAudio = async (body: ISendMessageData) => {
  const response = await http.post<ISendMessage>('/chat/call-audio', body, {
    withCredentials: true
  });
  return response;
};

export const callAudioReq = async (body: ISendMessageData) => {
  const response = await http.post<ISendMessage>(
    '/chat/call-audio-socket',
    body,
    {
      withCredentials: true
    }
  );
  return response;
};

export const markAsSeen = async (receiverId: string) => {
  const response = await http.put<ISendMessage>(
    '/chat/mark-as-seen/',
    { receiverId },
    { withCredentials: true }
  );
  return response;
}

// export const conversationApi: ConversationApi = new ConversationApi();
