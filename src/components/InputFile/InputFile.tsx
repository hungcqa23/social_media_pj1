import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import config from 'src/constants/config';

interface Props {
  onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    fileInputRef.current?.setAttribute('value', '');
    if (
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadAvatar ||
        !fileFromLocal.type.includes('image'))
    ) {
      toast.error(`The file must be less than 1 MB. And it must be an image`, {
        position: 'top-center'
      });
    } else {
      onChange && onChange(fileFromLocal);
    }
  };
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={event => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event.target as any).value = null;
        }}
      />
      <button
        className='text-base font-medium text-blue-400 hover:underline'
        type='button'
        onClick={handleUpload}
      >
        Change photo image
      </button>
    </Fragment>
  );
}
