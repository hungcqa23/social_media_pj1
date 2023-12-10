import { User } from "src/types/user.type";
import { socketIOService } from "./socket";
import { IMessageData, ISenderReceiver } from "src/types/conversation.type";
import { cloneDeep } from "lodash";

export class ChatSocket {
  static joinRoom(user: User, profile: User) {
    const users: ISenderReceiver = {
      senderId: profile._id,
      senderName: profile.username,
      receiverId: user._id,
      receiverName: user.username
    };
    socketIOService.getSocket().emit('join room', users);
  }

  static receiveMessage(
    messages: IMessageData[],
    username: string,
    setMessages: (data: IMessageData[]) => void
  ) {
    socketIOService.getSocket().on('message receive', (data: IMessageData) => {
      messages.push(data);
      setMessages(messages);
    });
  }
}
