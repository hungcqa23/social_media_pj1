/* eslint-disable jsx-a11y/media-has-caption */
import Peer, { MediaConnection } from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
import NewWindow from 'react-new-window';
import hangUpIcon from '../../assets/icons/end-call-end-call-svgrepo-com.svg';
import { socketIOService } from 'src/socket/socket';

type Props = {
  callAccepted?: boolean;
  callEnded?: boolean;
  isReceiver?: boolean;
  username?: string;
  receiverId?: string;
  receiverProfilePicture?: string;
  senderProfilePicture?: string;
  senderId?: string;
  isVideoCall?: boolean;
  peer?: Peer;
  setCallEnded?: (ended: boolean) => void;
  onClose: () => void;
};

let stream: MediaStream;
let receiverStream: MediaStream;
let callRef: MediaConnection;

const VideoCall = (props: Props) => {
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteUserVideoRef = useRef<HTMLVideoElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!props.isReceiver) {
      socketIOService.getSocket().emit('get peerId', {
        userToGet: props.receiverId,
        userWhoAsk: props.senderId
      });
      socketIOService.getSocket().on('receive id', id => {
        navigator.mediaDevices
          .getUserMedia({
            video: props.isVideoCall ? true : false,
            audio: true
          })
          .then((incomeStream: MediaStream) => {
            stream = incomeStream;
            if (props.isVideoCall) {
              if (currentUserVideoRef.current) {
                currentUserVideoRef.current.srcObject = incomeStream;
                currentUserVideoRef.current.play();
              }
            } else {
              if (currentAudioRef.current) {
                currentAudioRef.current.srcObject = incomeStream;
                currentAudioRef.current.play();
              }
            }
            if (props.peer && !props.isReceiver) {
              console.log(id);
              const call: MediaConnection = props.peer.call(id, incomeStream);
              callRef = call;
              call.on('stream', (remoteStream: MediaStream) => {
                if (props.isVideoCall) {
                  if (remoteUserVideoRef.current) {
                    remoteUserVideoRef.current.srcObject = remoteStream;
                    remoteUserVideoRef.current.play();
                  }
                } else {
                  if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = remoteStream;
                    remoteAudioRef.current.play();
                  }
                }
              });
              call.on('close', () => {
                props.onClose();
              });
            }
          })
          .catch(error => console.log(error));
      });
    }
  }, []);

  useEffect(() => {
    if (props.isReceiver && props.peer) {
      props.peer.on('call', call => {
        callRef = call;
        navigator.mediaDevices
          .getUserMedia({
            video: props.isVideoCall ? true : false,
            audio: true
          })
          .then((incomeStream: MediaStream) => {
            receiverStream = incomeStream;
            if (props.isVideoCall) {
              if (currentUserVideoRef.current) {
                currentUserVideoRef.current.srcObject = incomeStream;
                currentUserVideoRef.current.play();
              }
            } else {
              if (currentAudioRef.current) {
                currentAudioRef.current.srcObject = incomeStream;
                currentAudioRef.current.play();
              }
            }
            call.answer(incomeStream);
            call.on('stream', (remoteStream: MediaStream) => {
              if (props.isVideoCall) {
                if (remoteUserVideoRef.current) {
                  remoteUserVideoRef.current.srcObject = remoteStream;
                  remoteUserVideoRef.current.play();
                }
              } else {
                if (remoteAudioRef.current) {
                  remoteAudioRef.current.srcObject = remoteStream;
                  remoteAudioRef.current.play();
                }
              }
            });
            call.on('close', () => {
              props.onClose();
            });
          })
          .catch(error => {
            navigator.mediaDevices
              .getUserMedia({
                video: false,
                audio: true
              })
              .then((incomeStream: MediaStream) => {
                receiverStream = incomeStream;
                if (currentAudioRef.current) {
                  currentAudioRef.current.srcObject = incomeStream;
                  currentAudioRef.current.play();
                }
                call.answer(incomeStream);
                call.on('stream', (remoteStream: MediaStream) => {
                  if (props.isVideoCall) {
                    if (remoteUserVideoRef.current) {
                      remoteUserVideoRef.current.srcObject = remoteStream;
                      remoteUserVideoRef.current.play();
                    }
                  } else {
                    if (remoteAudioRef.current) {
                      remoteAudioRef.current.srcObject = remoteStream;
                      remoteAudioRef.current.play();
                    }
                  }
                  console.log('local', currentUserVideoRef.current?.srcObject);
                  console.log('remote', remoteUserVideoRef.current?.srcObject);
                  console.log(
                    'local audio',
                    currentAudioRef.current?.srcObject
                  );
                  console.log(
                    'remote audio',
                    remoteAudioRef.current?.srcObject
                  );
                });
                call.on('close', () => {
                  props.onClose();
                });
                console.log(error);
              });
          });
      });
    }
  }, []);

  const handleTurnOff = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (receiverStream) {
      receiverStream.getTracks().forEach(track => track.stop());
    }
    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = null;
    }
    if (remoteUserVideoRef.current) {
      remoteUserVideoRef.current.srcObject = null;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.srcObject = null;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }

    if (callRef) {
      if (props.setCallEnded) {
        props.setCallEnded(true);
      }
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
          <div className='flex h-full w-[48%] items-center justify-center'>
            {props.isVideoCall ? (
              <video ref={currentUserVideoRef} muted playsInline />
            ) : (
              <div className='max-w-full rounded-full'>
                <img
                  src={props.senderProfilePicture}
                  alt='profile'
                  className='max-w-full'
                />
                <audio ref={currentAudioRef} hidden={true} />
              </div>
            )}
          </div>
          <div className='flex h-full w-[48%] items-center justify-center'>
            {props.isVideoCall ? (
              <video ref={remoteUserVideoRef} muted playsInline />
            ) : (
              <div className='max-w-full rounded-full'>
                <img
                  src={props.receiverProfilePicture}
                  alt='profile'
                  className='max-w-full'
                />
                <audio ref={remoteAudioRef} hidden={true} />
              </div>
            )}
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
