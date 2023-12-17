import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';

export const isAxiosUnprocessableEntityError = <FormError>(
  error: unknown
): error is AxiosError<FormError> =>
  isAxiosError(error) &&
  error.response?.status === HttpStatusCode.UnprocessableEntity;

export const isActiveRoute = (pathname: string, keyword: string) => {
  return pathname.split('/')[1] === keyword;
};

export const calculateTextWidth = (
  elementRef: React.RefObject<HTMLTextAreaElement>
) => {
  if (!elementRef?.current) {
    return;
  }
  const text = elementRef.current.value;

  // Create a temporary element to measure the width
  const tempElement = document.createElement('div');
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden';
  tempElement.style.whiteSpace = 'pre-wrap'; // Preserve line breaks
  tempElement.innerText = text;

  // Append the temporary element to the body
  document.body.appendChild(tempElement);

  // Get the width of the temporary element
  const textWidth = tempElement.getBoundingClientRect().width;

  // Remove the temporary element
  document.body.removeChild(tempElement);

  return textWidth;
};

export function formatMessageDateTime(date: Date): string {
  if (isToday(date)) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  } else {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  }
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function validateFile(file, type?: 'image' | 'video') {
  if (type === 'image') {
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    return file && validImageTypes.indexOf(file.type) > -1;
  } else {
    const validVideoTypes = [
      'video/m4v',
      'video/avi',
      'video/mpg',
      'video/mp4',
      'video/webm'
    ];
    return file && validVideoTypes.indexOf(file.type) > -1;
  }
}

function checkFileSize(file, type?: 'image' | 'video') {
  let fileError = '';
  const isValid = validateFile(file, type);
  if (!isValid) {
    fileError = `File ${file.name} not accepted`;
  }
  if (file.size > 50000000) {
    // 50 MB
    fileError = 'File is too large.';
  }
  return fileError;
}

export function checkFile(file, type?: 'image' | 'video') {
  if (!validateFile(file, type)) {
    return window.alert(`File ${file.name} not accepted`);
  }
  if (checkFileSize(file, type)) {
    return window.alert(checkFileSize(file, type));
  }
}

export function readAsBase64(file: File): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader();

  const fileValue = new Promise<string | ArrayBuffer | null>(
    (resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    }
  );

  return fileValue;
}

export function formatTimeDifference(sendTime: Date): string {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - sendTime.getTime();

  // Calculate time units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months}m ${days % 30}d`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return 'now';
  }
}
