import SimplePeer, { SignalData } from 'simple-peer';

export interface IMessageData {
  _id: string;
  conversationId: string;
  links: ILinks[];
  images: IImages[];
  receiverId: string;
  receiverUsername: string;
  receiverProfilePicture: string;
  senderUsername: string;
  senderId: string;
  senderProfilePicture: string;
  body: string;
  isRead: boolean;
  gifUrl: string;
  isVideoCall: string;
  isAudioCall: string;
  selectedImage: string;
  createdAt: Date | string;
  deleteForMe: boolean;
  deleteForEveryone: boolean;
}

export interface ISendMessageData {
  receiverId: string;
  receiverUsername: string;
  receiverProfilePicture: string;
  body: string;
  selectedImage?: string;
  conversationId?: string;
  peerId?: string;
}

export interface ISenderReceiver {
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
}

export interface ICallUser {
  currentUserStream: MediaStream;
  message: IMessageData;
  userVideoRef: React.RefObject<HTMLVideoElement>;
  connectionRef: React.MutableRefObject<SimplePeer.Instance>;
  callSignal?: SignalData;
  setCallAccepted: (accepted: boolean) => void;
  setCallEnded: (ended: boolean) => void;
  setReceivingCall: (receivingCall: boolean) => void;
}

export interface ILinks {
  link: string;
}

export interface IImages {
  image: string;
}
