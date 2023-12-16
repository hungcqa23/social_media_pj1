/* eslint-disable jsx-a11y/media-has-caption */
import Peer, { MediaConnection } from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
import NewWindow from 'react-new-window';
import hangUpIcon from '../../assets/icons/end-call-end-call-svgrepo-com.svg';
import Webcam from 'react-webcam';

type Props = {
  callAccepted?: boolean;
  callEnded?: boolean;
  isReceiver?: boolean;
  username?: string;
  receiverPeerId?: string;
  peer?: Peer;
  onClose: () => void;
};

let stream: MediaStream;
let receiverStream: MediaStream;
let callRef: MediaConnection;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
};

const VideoCall = (props: Props) => {
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteUserVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(props.callAccepted);
    if (props.isReceiver && props.peer) {
      props.peer.on('call', call => {
        callRef = call;
        console.log('on call');
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((incomeStream: MediaStream) => {
            receiverStream = incomeStream;
            if (currentUserVideoRef.current) {
              currentUserVideoRef.current.srcObject = incomeStream;
              currentUserVideoRef.current.play();
            }
            call.answer(incomeStream);
            call.on('stream', (remoteStream: MediaStream) => {
              console.log('come on receiver stream');
              if (remoteUserVideoRef.current) {
                remoteUserVideoRef.current.srcObject = remoteStream;
                remoteUserVideoRef.current.play();
              }
              console.log('local', currentUserVideoRef.current?.srcObject);
              console.log('remote', remoteUserVideoRef.current?.srcObject);
            });
            call.on('close', () => {
              props.onClose();
            });
          })
          .catch(error => console.log(error));
      });
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((incomeStream: MediaStream) => {
          stream = incomeStream;
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = incomeStream;
            currentUserVideoRef.current.play();
          }
          if (props.peer && !props.isReceiver) {
            const call: MediaConnection = props.peer.call(
              '370c0216-2ae3-4233-b3cb-19a67e4e7819',
              incomeStream
            );
            callRef = call;
            call.on('stream', (remoteStream: MediaStream) => {
              console.log('come on sender stream');
              if (remoteUserVideoRef.current) {
                remoteUserVideoRef.current.srcObject = remoteStream;
                remoteUserVideoRef.current.play();
              }
              console.log('local', currentUserVideoRef.current?.srcObject);
              console.log('remote', remoteUserVideoRef.current?.srcObject);
            });
            call.on('close', () => {
              props.onClose();
            });
          }
        })
        .catch(error => console.log(error));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (receiverStream) {
        receiverStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleTurnOff = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (receiverStream) {
      receiverStream.getTracks().forEach(track => track.stop());
    }
    if (callRef) {
      callRef.close();
    }
  };

  return (
    <NewWindow
      title={props.username}
      center='screen'
      copyStyles
      onUnload={handleTurnOff}
    >
      <div className='flex h-full w-full flex-col gap-1 bg-slate-800'>
        <div className='flex h-[80%] w-full flex-row justify-between'>
          <div className='flex h-full w-[48%] items-center justify-center border'>
            {/* {!props.callAccepted && <h1 className='text-white'>Calling</h1>}
            {props.callAccepted && (
              
            )} */}
            <video ref={currentUserVideoRef} muted playsInline />
          </div>
          <div className='flex h-full w-[48%] items-center justify-center border'>
            <video ref={remoteUserVideoRef} muted playsInline />
          </div>
        </div>
        <div className='flex h-[20%] w-full items-center justify-center'>
          <button onClick={props.onClose}>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-500 p-2'>
              <img src={hangUpIcon} alt='icon' />
            </div>
          </button>
        </div>
      </div>
    </NewWindow>
  );
};

export default VideoCall;
