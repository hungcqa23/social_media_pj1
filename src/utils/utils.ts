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
