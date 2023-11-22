import { useRef, useState } from 'react';
import IconProfile from '../IconProfile';
import { calculateTextWidth } from 'src/utils/utils';

export default function Conversation() {
  const [value, setValue] = useState<string>('');
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxTextAreaHeight = 48;
  const fontSizeTextArea = 14;
  const originalHeight = 24;

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      if (textareaRef.current) {
        // Check if it's only 1 line
        const textAreaWidth = textareaRef.current.clientWidth;
        const textWidth = calculateTextWidth(textareaRef);
        if ((textWidth || 0) < textAreaWidth) {
          return (textareaRef.current.style.height = `${originalHeight}px`);
        }

        // Calculate the new height
        const newHeight = Math.min(maxTextAreaHeight, textareaRef.current.scrollHeight);
        // Set the new height to the textarea
        textareaRef.current.style.height = `${newHeight}px`;

        if (textareaRef.current.scrollHeight > maxTextAreaHeight) {
          textareaRef.current.style.overflowY = 'scroll';
        } else {
          textareaRef.current.style.overflowY = 'hidden';
        }
      }
    }
  };

  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <header className='space-between flex justify-between border-b px-4 py-4'>
        <div className='flex items-center'>
          <IconProfile />
          <span className='ml-2 text-sm font-medium text-gray-950'>Andrew 2 tay</span>
        </div>
        <div className='flex gap-2'>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300'>
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
          <button className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-300'>
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
          <button className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-300'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_97_724)'>
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
      <form onSubmit={send} className='flex h-16 w-full items-center border-t'>
        <button className='flex h-10 w-10 items-center justify-center'>
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
        </button>

        <div className='mx-2 my-2 flex h-12 flex-grow items-center justify-between rounded-full border'>
          <textarea
            ref={textareaRef}
            onChange={onTextChange}
            className='ml-4 h-6 basis-11/12 resize-none whitespace-pre-wrap bg-slate-50 px-2 text-sm font-normal text-gray-950 outline-none'
            placeholder='Write a message...'
            value={value}
          />
          <button className='mr-2'>
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
}
