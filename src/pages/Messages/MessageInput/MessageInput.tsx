/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ImagePreview from 'src/components/ImagePreview';
import { calculateTextWidth, checkFile, readAsBase64 } from 'src/utils/utils';
import { default_image_sent_message } from '../Message/Message';

const maxTextAreaHeight = 48;
const originalHeight = 24;

interface Props {
  isBlocked: boolean;
  setChatMessage: (
    message: string,
    selectedImage: string | ArrayBuffer | null
  ) => void;
}

const MessageInput = ({ setChatMessage, isBlocked }: Props) => {
  const [message, setMessage] = useState<string>();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [file, setFile] = useState('');
  const [base64file, setBase64File] = useState<string | ArrayBuffer | null>();
  const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const reset = () => {
    setBase64File('');
    setShowImagePreview(false);
    setFile('');
    setMessage('');
  };
  const addToPreview = async (file: File) => {
    if (checkFile(file, 'image')) {
      setFile(URL.createObjectURL(file));
      const image_b64 = await readAsBase64(file);
      setBase64File(image_b64);
      setShowImagePreview(!showImagePreview);
    }
  };

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(() => {
      if (message) {
        setChatMessage(message.replace(/ +(?= )/g, ''), base64file!);
        return message;
      } else {
        if (!base64file) {
          return;
        } else {
          setChatMessage(
            default_image_sent_message.replace(/ +(?= )/g, ''),
            base64file!
          );
          return default_image_sent_message;
        }
      }
    });
    reset();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (messageInputRef.current) {
      // Check if it's only 1 line
      const textAreaWidth = messageInputRef.current.clientWidth;
      const textWidth = calculateTextWidth(messageInputRef);
      if ((textWidth || 0) < textAreaWidth) {
        return (messageInputRef.current.style.height = `${originalHeight}px`);
      }

      // Calculate the new height
      const newHeight = Math.min(
        maxTextAreaHeight,
        messageInputRef.current.scrollHeight
      );
      // Set the new height to the textarea
      messageInputRef.current.style.height = `${newHeight}px`;

      if (messageInputRef.current.scrollHeight > maxTextAreaHeight) {
        messageInputRef.current.style.overflowY = 'scroll';
      } else {
        messageInputRef.current.style.overflowY = 'hidden';
      }
    }
  };

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [setChatMessage]);

  return (
    <div>
      {showImagePreview && (
        <ImagePreview
          image={file}
          onRemoveImage={() => {
            setFile('');
            setBase64File('');
            setShowImagePreview(!showImagePreview);
          }}
        />
      )}
      <form
        className='flex h-16 w-full items-center border-t'
        onSubmit={handleClick}
      >
        <div className='flex h-10 w-10 cursor-pointer items-center justify-center'>
          <label className='cursor-pointer' htmlFor='file-input'>
            <svg
              width={24}
              height={24}
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_543_589)'>
                <path
                  d='M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z'
                  fill='#CCCCCC'
                />
              </g>
              <defs>
                <clipPath id='clip0_543_589'>
                  <rect width={24} height={24} fill='white' />
                </clipPath>
              </defs>
            </svg>
          </label>
          <input
            ref={fileInputRef}
            type='file'
            id='file-input'
            className='hidden'
            disabled={isBlocked}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) {
                return;
              }
              addToPreview(event.target.files[0]);
            }}
          />
        </div>

        <div className='mx-2 my-2 flex h-12 flex-grow items-center justify-between rounded-full border'>
          <textarea
            ref={messageInputRef}
            value={message}
            disabled={isBlocked}
            onChange={handleTextChange}
            className='ml-4 h-6 basis-11/12 resize-none whitespace-pre-wrap px-2 text-sm font-normal text-gray-950 outline-none'
            placeholder='Write a message...'
          />
          <button className='mr-2' disabled={isBlocked}>
            <svg
              width={24}
              height={24}
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_114_1343)'>
                <path
                  d='M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z'
                  fill='#CCCCCC'
                />
              </g>
              <defs>
                <clipPath id='clip0_114_1343'>
                  <rect width={24} height={24} fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
