import moment from 'moment';

export const formatDate = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);

  const formattedDate = inputDate.format('D MMMM [at] HH:mm');

  return formattedDate;
};
