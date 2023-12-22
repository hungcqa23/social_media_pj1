import { User } from 'src/types/user.type';
import { socketIOService } from './socket';
import { IMessageData, ISenderReceiver } from 'src/types/conversation.type';
import { cloneDeep, findIndex, remove } from 'lodash';

export class ChatSocket {
  static chatMessages: IMessageData[] = [];
  static conversations: IMessageData[] = [];

  static joinRoom(user: User, profile: User) {
    const users: ISenderReceiver = {
      senderId: profile._id,
      senderName: profile.username,
      receiverId: user._id,
      receiverName: user.username
    };
    if (!socketIOService.getSocket()) return;
    socketIOService.getSocket().emit('join room', users);
  }

  static conversation(
    profile: User,
    conversations: IMessageData[],
    setConversations: (data: IMessageData[]) => void
  ) {
    if (!socketIOService.getSocket()) return;
    socketIOService
      .getSocket()
      .on('chat conversation', (data: IMessageData) => {
        if (
          data.senderUsername.toLowerCase() ===
            profile.username.toLowerCase() ||
          data.receiverUsername.toLowerCase() === profile.username.toLowerCase()
        ) {
          const isFound = findIndex(
            conversations,
            (item: IMessageData) => item.conversationId === data.conversationId
          );
          conversations = cloneDeep(conversations);
          if (isFound > -1) {
            remove(
              conversations,
              (conversation: IMessageData) =>
                conversation.conversationId === data.conversationId
            );
            conversations = [data, ...conversations];
          } else {
            conversations.push(data);
          }
          setConversations(conversations);
        }
      });
    socketIOService.getSocket().on('message read', (data: IMessageData) => {
      if (
        data.senderUsername.toLowerCase() === profile.username ||
        data.receiverUsername.toLowerCase() === profile.username
      ) {
        const messageIndex: number = findIndex(this.chatMessages, [
          '_id',
          data._id
        ]);
        if (messageIndex > -1) {
          this.chatMessages.splice(messageIndex, 1, data);
          conversations = [...this.chatMessages];
        }
      }
    });
  }

  static receiveMessage(
    messages: IMessageData[],
    username: string,
    setMessages: (data: IMessageData[]) => void
  ) {
    messages = cloneDeep(messages);
    if (!socketIOService.getSocket()) return;
    socketIOService.getSocket().on('message receive', (data: IMessageData) => {
      if (
        data.senderUsername.toLowerCase() === username.toLowerCase() ||
        data.receiverUsername.toLowerCase() === username.toLowerCase()
      ) {
        if (ChatSocket.chatMessages.length === 0 || data.conversationId === ChatSocket.chatMessages[0].conversationId) {
          ChatSocket.chatMessages.push(data);
          messages = [...this.chatMessages];
          setMessages(messages);
        }
      }
    });
  }
}
