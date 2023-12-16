import { User } from 'src/types/user.type';
import { socketIOService } from './socket';
import {
  IMessageData,
  ISenderReceiver,
  ICallUser
} from 'src/types/conversation.type';
import { cloneDeep, findIndex, remove } from 'lodash';
import SimplePeer, { SignalData } from 'simple-peer';

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
        ChatSocket.chatMessages.push(data);
        messages = [...this.chatMessages];
        setMessages(messages);
      }
    });
  }

  static callUser(callData: ICallUser) {
    console.log('calling ', callData.message.senderUsername);
    if (!socketIOService.getSocket()) return;
    const peer: SimplePeer.Instance = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: callData.currentUserStream
    });

    peer.on('signal', (data: SignalData) => {
      socketIOService.getSocket().emit('call user', {
        signal: data,
        message: callData.message
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      if (callData.userVideoRef.current) {
        callData.userVideoRef.current.srcObject = stream;
      }
    });

    socketIOService.getSocket().on('call accepted', (signal: SignalData) => {
      callData.setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on('close', () => {
      console.log('peer close');
      callData.setCallEnded(true);
      callData.setCallAccepted(false);
      callData.setReceivingCall(false);
      socketIOService.getSocket().off('call accepted');
    });

    if (callData.connectionRef.current) {
      callData.connectionRef.current = peer;
    }
  }

  static answerCall(callData: ICallUser) {
    if (!socketIOService.getSocket()) return;
    callData.setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: callData.currentUserStream
    });

    peer.on('signal', (data: SignalData) => {
      socketIOService.getSocket().emit('answer call', {
        signal: data,
        message: callData.message
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      if (callData.userVideoRef.current) {
        callData.userVideoRef.current.srcObject = stream;
      }
    });

    if (callData.callSignal) {
      peer.signal(callData.callSignal);
    }

    peer.on('close', () => {
      console.log('peer close');
      callData.setCallEnded(true);
      callData.setCallAccepted(false);
      callData.setReceivingCall(false);
      socketIOService.getSocket().off('call accepted');
    });

    callData.connectionRef.current = peer;
  }

  static leaveCall(connectionRef: React.RefObject<SimplePeer.Instance>) {
    connectionRef.current?.destroy();
  }

  // static call()
}
