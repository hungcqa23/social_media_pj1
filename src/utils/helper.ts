import moment from 'moment';

export const formatDate = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);

  const formattedDate = inputDate.format('D MMMM [at] HH:mm');

  return formattedDate;
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
