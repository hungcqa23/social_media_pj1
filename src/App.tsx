import { ToastContainer } from 'react-toastify';
import useRouteElement from './useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { socketIOService } from './socket/socket';
import { AppContext } from './contexts/app.contexts';
import { IMessageData } from './types/conversation.type';
import VideoCall from './pages/VideoCall';

function App() {
  const routeElement = useRouteElement();
  const { peer, setPeerId, profile } = useContext(AppContext);
  const [callAccepted, SetCallAccepted] = useState<boolean>(false);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);

  useEffect(() => {
    socketIOService.setUpConnection();

    if (profile && socketIOService.getSocket()) {
      socketIOService.getSocket().emit('setup', { userId: profile._id });
    }

    // peer.on('call', call => {
    //   console.log('on call');
    //   // SetReceivingCall(true);
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true, audio: true })
    //     .then((incomeStream: MediaStream) => {
    //       call.answer(incomeStream);
    //       call.on('stream', (remoteStream: MediaStream) => {
    //         console.log(remoteStream);
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // });

    peer.on('open', (id: string) => {
      setPeerId(id);
      console.log('peerId', id);
      socketIOService
        .getSocket()
        .emit('peer connect', { peerId: id, userId: profile?._id });
    });

    peer.on('disconnected', (id: string) => {
      // peer.reconnect();
      socketIOService.getSocket().emit('peer disconnected', id);
    });

    if (socketIOService.getSocket()) {
      socketIOService.getSocket().on('call user', (data: IMessageData) => {
        if (
          data.receiverUsername.toLowerCase() ===
          profile?.username.toLowerCase()
        ) {
          console.log(`You have a call from ${data.senderUsername}`);
          SetCallAccepted(true);
          setIsWindowOpen(true);
        }
      });
    }
  }, []);

  const handleOnClose = () => {
    SetCallAccepted(!callAccepted);
    setCallEnded(!callEnded);
  }

  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      {routeElement}
      {callAccepted && isWindowOpen && (
        <VideoCall
          peer={peer}
          isReceiver={true}
          callAccepted={callAccepted}
          username={profile?.username}
          onClose={handleOnClose}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
