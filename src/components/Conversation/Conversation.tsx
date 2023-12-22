/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import IconProfile from '../IconProfile';
import { useParams } from 'react-router-dom';
import {
  callAudio,
  callAudioReq,
  callVideo,
  callVideoReq,
  markAsSeen,
  retrieveMessages,
  sendMessage
} from 'src/apis/conversation.api';
import { AppContext } from 'src/contexts/app.contexts';
import Message from '../Message';
import { IMessageData, ISendMessageData } from 'src/types/conversation.type';
import MessageInput from '../MessageInput';
import { User } from 'src/types/user.type';
import { getUserProfile } from 'src/apis/user.api';
import useScrollToBottom from 'src/hooks/useScrollToBottom';
import { ChatSocket } from 'src/socket/chatSocket';
import { socketIOService } from 'src/socket/socket';
import VideoCall from 'src/pages/VideoCall';
import { checkIfCurrentUserBeingBannedOrBanThePartner } from 'src/utils/utils';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';

export default function Conversation() {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<User>();
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useScrollToBottom(messages);
  const [isVideoCall, setisVideoCall] = useState<boolean>();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const receiverId = useParams();
  const { profile, peer, peerId } = useContext(AppContext);

  const handleVideoCallClick = () => {
    setIsWindowOpen(true);
    setisVideoCall(true);
    callChatVideoReq();
  };

  const handleAudioCallClick = () => {
    setIsWindowOpen(true);
    setisVideoCall(false);
    callChatAudioReq();
  };

  const getMessages = useCallback(async (receiverId: string) => {
    const response: IMessageData[] = (await retrieveMessages(
      receiverId
    )) as IMessageData[];
    ChatSocket.chatMessages = [...response];
    setMessages([...ChatSocket.chatMessages]);
  }, []);

  const markMessagesAsSeen = useCallback(async (receiverId: string) => {
    await markAsSeen(receiverId);
  }, []);

  const getProfile = useCallback(
    async (id: string) => {
      const response: User = (await getUserProfile(id)) as unknown as User;
      setIsBlocked(
        checkIfCurrentUserBeingBannedOrBanThePartner(response, profile!._id)
      );
      setReceiver(response);
      ChatSocket.joinRoom(response, profile as User);
    },
    [profile]
  );

  useEffect(() => {
    if (isVideoCall) {
      if (callEnded) {
        callChatVideo();
      }
    } else {
      if (callEnded) {
        callChatAudio();
      }
    }
  }, [callEnded, isVideoCall]);

  useEffect(() => {
    setIsLoading(true);
    if (fetched) {
      getProfile(receiverId.id as string);
      getMessages(receiverId.id as string);
    }
    if (!fetched) {
      setFetched(true);
    }
    return () => {
      if (fetched) {
        socketIOService.getSocket().off('join room');
      }
    };
  }, [getProfile, getMessages, fetched, receiverId.id]);

  useEffect(() => {
    if (fetched) {
      ChatSocket.receiveMessage(messages, profile!.username, setMessages);
      if (messages.length > 0) {
        markMessagesAsSeen(receiverId.id as string);
      }
      setIsLoading(false);
    }
    if (!fetched) {
      setFetched(true);
    }
    return () => {
      if (fetched) {
        socketIOService.getSocket().off('message receive');
        socketIOService.getSocket().off('message read');
      }
    };
    },
    [fetched, profile, receiverId.id, ChatSocket.receiveMessage]
  );

  const sendChatMessage = async (
    message: string,
    selectedImage: string | ArrayBuffer | null
  ) => {
    if (!receiver) return;
    const reqBody: ISendMessageData = {
      receiverId: receiver._id,
      receiverProfilePicture: receiver.profilePicture,
      receiverUsername: receiver.username,
      body: message,
      selectedImage: selectedImage ? selectedImage : undefined,
      conversationId:
        messages.length > 0 ? messages[0].conversationId : undefined
    } as ISendMessageData;
    await sendMessage(reqBody);
  };

  const callChatVideoReq = async () => {
    if (!receiver) return;
    const reqBody: ISendMessageData = {
      receiverId: receiver._id,
      receiverProfilePicture: receiver.profilePicture,
      receiverUsername: receiver.username,
      body: `${profile?.username} called you!`,
      // conversationId: messages[0].conversationId,
      peerId
    } as ISendMessageData;
    await callVideoReq(reqBody);
  };

  const callChatVideo = async () => {
    if (!receiver) return;
    const reqBody: ISendMessageData = {
      receiverId: receiver._id,
      receiverProfilePicture: receiver.profilePicture,
      receiverUsername: receiver.username,
      body: `${profile?.username} called you!`,
      conversationId:
        messages.length > 0 ? messages[0].conversationId : undefined,
      peerId
    } as ISendMessageData;
    await callVideo(reqBody);
  };

  const callChatAudio = async () => {
    if (!receiver) return;
    const reqBody: ISendMessageData = {
      receiverId: receiver._id,
      receiverProfilePicture: receiver.profilePicture,
      receiverUsername: receiver.username,
      body: `${profile?.username} called you!`,
      conversationId:
        messages.length > 0 ? messages[0].conversationId : undefined,
      peerId
    } as ISendMessageData;
    await callAudio(reqBody);
  };

  const callChatAudioReq = async () => {
    if (!receiver) return;
    const reqBody: ISendMessageData = {
      receiverId: receiver._id,
      receiverProfilePicture: receiver.profilePicture,
      receiverUsername: receiver.username,
      body: `${profile?.username} called you!`,
      // conversationId: messages[0].conversationId,
      peerId
    } as ISendMessageData;
    await callAudioReq(reqBody);
  };

  return (
    <>
      <div className='flex h-full w-full flex-col justify-between'>
        <header className='space-between flex justify-between border-b px-4 py-4'>
          <div className='flex items-center'>
            <IconProfile src={profile?.profilePicture} />
            <span className='ml-2 text-sm font-medium text-gray-950'>
              {profile?.username}
            </span>
          </div>
          <div className='flex gap-2'>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300'
              disabled={isBlocked}
              onClick={handleAudioCallClick}
            >
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20.1722 18.6325L20.7012 19.1645L20.1712 18.6325H20.1722ZM7.56617 16.4765L8.09417 15.9445L7.56517 16.4765H7.56617ZM3.44017 5.88447L2.91217 5.35347L3.44117 5.88547L3.44017 5.88447ZM15.3782 15.6405L15.8352 15.1875L14.7762 14.1235L14.3222 14.5765L15.3782 15.6405ZM17.3642 14.9975L19.2752 16.0365L19.9902 14.7185L18.0802 13.6805L17.3642 14.9975ZM19.6422 18.1005L18.2222 19.5135L19.2792 20.5765L20.6992 19.1645L19.6422 18.1005ZM17.3562 19.9675C15.9062 20.1035 12.1562 19.9825 8.09417 15.9445L7.03617 17.0075C11.4682 21.4145 15.6872 21.6305 17.4962 21.4615L17.3552 19.9675H17.3562ZM8.09417 15.9445C4.22317 12.0945 3.58117 8.85747 3.50117 7.45247L2.00317 7.53747C2.10317 9.30547 2.89817 12.8935 7.03617 17.0075L8.09417 15.9445ZM9.46917 9.76447L9.75617 9.47847L8.70017 8.41547L8.41317 8.70047L9.47017 9.76347L9.46917 9.76447ZM9.98417 5.84347L8.72417 4.15947L7.52317 5.05947L8.78317 6.74247L9.98417 5.84347ZM4.48317 3.79247L2.91317 5.35247L3.97117 6.41647L5.54017 4.85647L4.48317 3.79247ZM8.94117 9.23247C8.41117 8.70047 8.41117 8.70047 8.41117 8.70247H8.40917L8.40617 8.70647C8.35896 8.75466 8.31643 8.80723 8.27917 8.86347C8.22517 8.94347 8.16617 9.04847 8.11617 9.18147C7.9944 9.52479 7.96408 9.89388 8.02817 10.2525C8.16217 11.1175 8.75817 12.2605 10.2842 13.7785L11.3422 12.7145C9.91317 11.2945 9.57317 10.4305 9.51017 10.0225C9.48017 9.82847 9.51117 9.73247 9.52017 9.71047C9.52517 9.69647 9.52717 9.69547 9.52017 9.70447C9.51135 9.71834 9.50131 9.73139 9.49017 9.74347L9.48017 9.75347C9.47694 9.75658 9.47361 9.75958 9.47017 9.76247L8.94017 9.23247H8.94117ZM10.2842 13.7785C11.8112 15.2965 12.9602 15.8885 13.8262 16.0205C14.2692 16.0885 14.6262 16.0345 14.8972 15.9335C15.0487 15.8774 15.1905 15.7977 15.3172 15.6975C15.3344 15.6831 15.3511 15.6681 15.3672 15.6525L15.3742 15.6465L15.3772 15.6435L15.3782 15.6415C15.3782 15.6415 15.3792 15.6405 14.8502 15.1085C14.3202 14.5765 14.3232 14.5755 14.3232 14.5755L14.3252 14.5735L14.3272 14.5715L14.3332 14.5665L14.3432 14.5565C14.3552 14.5457 14.3679 14.5357 14.3812 14.5265C14.3912 14.5195 14.3882 14.5225 14.3742 14.5285C14.3492 14.5375 14.2512 14.5685 14.0542 14.5385C13.6402 14.4745 12.7702 14.1345 11.3422 12.7145L10.2842 13.7785ZM8.72417 4.15847C7.70417 2.79847 5.70017 2.58247 4.48317 3.79247L5.54017 4.85647C6.07217 4.32747 7.01617 4.38247 7.52317 5.05947L8.72317 4.15847H8.72417ZM3.50217 7.45347C3.48217 7.10747 3.64117 6.74547 3.97117 6.41747L2.91217 5.35347C2.37517 5.88747 1.95217 6.64347 2.00317 7.53747L3.50217 7.45347ZM18.2222 19.5135C17.9482 19.7875 17.6522 19.9415 17.3572 19.9685L17.4962 21.4615C18.2312 21.3925 18.8322 21.0225 19.2802 20.5775L18.2222 19.5135ZM9.75617 9.47847C10.7412 8.49947 10.8142 6.95247 9.98517 5.84447L8.78417 6.74347C9.18717 7.28247 9.12717 7.98947 8.69917 8.41647L9.75617 9.47847ZM19.2762 16.0375C20.0932 16.4815 20.2202 17.5275 19.6432 18.1015L20.7012 19.1645C22.0412 17.8315 21.6282 15.6085 19.9912 14.7195L19.2762 16.0375ZM15.8352 15.1885C16.2192 14.8065 16.8372 14.7125 17.3652 14.9985L18.0812 13.6815C16.9972 13.0915 15.6532 13.2545 14.7772 14.1245L15.8352 15.1885Z'
                  fill='black'
                />
              </svg>
            </button>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-300 disabled:opacity-80'
              disabled={isBlocked}
              onClick={handleVideoCallClick}
            >
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H14.25C14.8467 5.25 15.419 5.48705 15.841 5.90901C16.2629 6.33097 16.5 6.90326 16.5 7.5V16.5C16.5 17.0967 16.2629 17.669 15.841 18.091C15.419 18.5129 14.8467 18.75 14.25 18.75H5.25C4.65326 18.75 4.08097 18.5129 3.65901 18.091C3.23705 17.669 3 17.0967 3 16.5V7.5ZM5.25 3.75C4.25544 3.75 3.30161 4.14509 2.59835 4.84835C1.89509 5.55161 1.5 6.50544 1.5 7.5V16.5C1.5 17.4946 1.89509 18.4484 2.59835 19.1517C3.30161 19.8549 4.25544 20.25 5.25 20.25H14.25C14.7425 20.25 15.2301 20.153 15.6851 19.9645C16.14 19.7761 16.5534 19.4999 16.9017 19.1517C17.2499 18.8034 17.5261 18.39 17.7145 17.9351C17.903 17.4801 18 16.9925 18 16.5V15.75L20.7 17.775C20.8671 17.9004 21.0659 17.9767 21.274 17.9955C21.482 18.0142 21.6912 17.9747 21.8781 17.8812C22.065 17.7878 22.2221 17.6442 22.332 17.4664C22.4418 17.2887 22.5 17.0839 22.5 16.875V7.1325C22.5 6.92357 22.4418 6.71878 22.332 6.54105C22.2221 6.36333 22.065 6.2197 21.8781 6.12627C21.6912 6.03283 21.482 5.99328 21.274 6.01205C21.0659 6.03081 20.8671 6.10714 20.7 6.2325L18 8.25V7.5C18 7.00754 17.903 6.51991 17.7145 6.06494C17.5261 5.60997 17.2499 5.19657 16.9017 4.84835C16.5534 4.50013 16.14 4.22391 15.6851 4.03545C15.2301 3.847 14.7425 3.75 14.25 3.75H5.25ZM18 10.125L21 7.881V16.125L18 13.875V10.125Z'
                  fill='black'
                />
              </svg>
            </button>
            <button className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-300 disabled:opacity-80'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_97_724)'>
                  <path
                    d='M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
                    fill='black'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_97_724'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </header>
        <div
          className='w-full flex-1 items-end justify-center overflow-y-scroll'
          ref={scrollRef}
        >
          {messages.map((item: IMessageData, index: number) => (
            <Message
              item={item}
              key={index}
              isReceived={profile?._id === item.receiverId}
            />
          ))}
          {isBlocked && (
            <div className='bg-slate-200 p-4'>
              You have been blocked by this user or blocked this user. Check in{' '}
              <Link
                className='w-fit text-cyan-500 underline'
                to={'/accounts/who_can_see_your_content'}
              >
                Blocked list
              </Link>{' '}
              to see more information.
            </div>
          )}
        </div>
        <MessageInput isBlocked={isBlocked} setChatMessage={sendChatMessage} />
      </div>
      {isWindowOpen && (
        <VideoCall
          onClose={() => setIsWindowOpen(!isWindowOpen)}
          peer={peer}
          isReceiver={false}
          receiverId={receiverId.id}
          senderProfilePicture={profile?.profilePicture}
          receiverProfilePicture={receiver?.profilePicture}
          isVideoCall={isVideoCall}
          setCallEnded={setCallEnded}
          senderId={profile?._id}
          username={profile?.username}
        />
      )}
    </>
  );
}
