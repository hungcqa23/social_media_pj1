import { ToastContainer } from 'react-toastify';
import useRouteElement from './useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { socketIOService } from './socket/socket';
import { AppContext } from './contexts/app.contexts';
import { IMessageData } from './types/conversation.type';
import VideoCall from './pages/VideoCall';
import Dialog from './components/Dialog';
import CallDialog from './components/CallDialog/CallDialog';
import { MediaConnection } from 'peerjs';

export type ISender = {
  username: string;
  userProfilePicture: string;
};

function App() {
  const routeElement = useRouteElement();
  const { peer, setPeerId, profile } = useContext(AppContext);
  const [isReceivingCall, setIsReceivingCall] = useState<boolean>(false);
  const [callAccepted, SetCallAccepted] = useState<boolean>(false);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessageData>();
  const [sender, setSender] = useState<ISender>();
  const [call, setCall] = useState<MediaConnection>();
  useEffect(() => {
    socketIOService.setUpConnection();

    if (profile && socketIOService.getSocket()) {
      socketIOService.getSocket().emit('setup', { userId: profile._id });
    }

    if (profile && socketIOService.getSocket()) {
      peer.on('open', (id: string) => {
        setPeerId(id);
        console.log('peerId', id);
        socketIOService
          .getSocket()
          .emit('peer connect', { peerId: id, userId: profile?._id });
      });
    }

    peer.on('disconnected', (id: string) => {
      socketIOService.getSocket().emit('peer disconnected', id);
    });

    if (socketIOService.getSocket()) {
      socketIOService.getSocket().on('call user', (data: IMessageData) => {
        if (
          data.receiverUsername.toLowerCase() ===
          profile?.username.toLowerCase()
        ) {
          console.log(`You have a call from ${data.senderUsername}`);
          setMessage(data);
          peer.on('call', call => {
            setIsReceivingCall(true);
            setSender({
              username: data.senderUsername,
              userProfilePicture: data.senderProfilePicture
            });
            call.on('close', () => {
              console.log('it works');
              setIsReceivingCall(false);
            });
            setCall(call);
          });
        }
      });
    }
  }, []);

  const handleOnClose = () => {
    SetCallAccepted(!callAccepted);
    setCallEnded(!callEnded);
  };

  const handleAccept = () => {
    SetCallAccepted(true);
    setIsWindowOpen(true);
    setIsReceivingCall(false);
  };

  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      {routeElement}
      <Dialog
        isOpen={isReceivingCall}
        setIsOpen={setIsReceivingCall}
        className='hidden'
        disableUseDismiss={true}
        renderDialog={
          <CallDialog
            sender={sender!}
            onAccept={handleAccept}
            onReject={() => setIsReceivingCall(false)}
          />
        }
      >
        <></>
      </Dialog>
      {callAccepted && isWindowOpen && (
        <VideoCall
          peer={peer}
          call={call}
          isReceiver={true}
          callAccepted={callAccepted}
          senderProfilePicture={message?.senderProfilePicture}
          receiverProfilePicture={message?.receiverProfilePicture}
          isVideoCall={message!.isVideoCall as unknown as boolean}
          username={profile?.username}
          onClose={handleOnClose}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
