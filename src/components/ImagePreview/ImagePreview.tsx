import { color } from 'framer-motion';
import close from '../../assets/icons/close.svg';

type Props = {
  image: string;
  onRemoveImage: () => void;
};

const ImagePreview = ({ image, onRemoveImage }: Props) => {
  return (
    <div className='absolute bottom-16'>
      <div className='rounded border border-cyan-600 p-3 pb-2'>
        <img
          src={image}
          alt='imagePreview'
          className='h-36 w-36 rounded object-cover'
        />
        <button
          onClick={onRemoveImage}
          className='absolute right-1 top-1 mt-0 cursor-pointer bg-cyan-600'
        >
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.4531 7.5L14.3594 11.4453C14.8672 11.9141 14.8672 12.6953 14.3594 13.1641L13.5 14.0234C13.0312 14.5312 12.25 14.5312 11.7812 14.0234L7.875 10.1172L3.92969 14.0234C3.46094 14.5312 2.67969 14.5312 2.21094 14.0234L1.35156 13.1641C0.84375 12.6953 0.84375 11.9141 1.35156 11.4453L5.25781 7.5L1.35156 3.59375C0.84375 3.125 0.84375 2.34375 1.35156 1.875L2.21094 1.01562C2.67969 0.507812 3.46094 0.507812 3.92969 1.01562L7.875 4.92188L11.7812 1.01562C12.25 0.507812 13.0312 0.507812 13.5 1.01562L14.3594 1.875C14.8672 2.34375 14.8672 3.125 14.3594 3.59375L10.4531 7.5Z'
              fill='white'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
