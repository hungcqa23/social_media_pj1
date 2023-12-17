import moment from 'moment';
import { calculateTextWidth } from './utils';

export const formatDate = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);

  const formattedDate = inputDate.format('D MMMM [at] HH:mm');

  return formattedDate;
};

export const calculateTimeAgo = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);
  const now = moment();
  const timeAgoInMinutes = now.diff(inputDate, 'minutes');

  if (timeAgoInMinutes < 1) {
    // Less than a minute
    return 'just now';
  } else if (timeAgoInMinutes < 60) {
    // Less than an hour
    return timeAgoInMinutes + 'm';
  } else if (timeAgoInMinutes < 24 * 60) {
    // Less than a day
    const hours = Math.floor(timeAgoInMinutes / 60);
    return hours + 'h';
  } else if (timeAgoInMinutes < 30 * 24 * 60) {
    // Less than a month
    const days = Math.floor(timeAgoInMinutes / (24 * 60));
    return days + 'd';
  } else if (timeAgoInMinutes < 12 * 30 * 24 * 60) {
    // Less than a year
    const months = Math.floor(timeAgoInMinutes / (30 * 24 * 60));
    return months + 'mo';
  } else {
    // More than a year
    const years = Math.floor(timeAgoInMinutes / (12 * 30 * 24 * 60));
    return years + 'y';
  }
};
export const formatSocialNumber = (number: number): string => {
  // Format to number social media
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  })
    .format(number)
    .replace('.', ',');
};

export const handleTextAreaChange = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  originalHeight = 36
) => {
  if (textareaRef.current) {
    // Check if it's only 1 line
    const textAreaWidth = textareaRef.current.clientWidth;
    const textContentWidth = calculateTextWidth(textareaRef);
    if ((textContentWidth || 0) < textAreaWidth) {
      return (textareaRef.current.style.height = `${originalHeight}px`);
    }

    textareaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set the height to the scrollHeight
  }
};
