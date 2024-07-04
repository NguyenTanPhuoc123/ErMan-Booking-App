import moment from 'moment';

export function formatBlogDuration(minutes: number) {
  const hh = Math.floor(minutes / 60);
  const mm = Math.floor(minutes % 60);
  const ss = Math.floor(minutes * 60);
  if (hh > 0) {
    return hh + ' giờ' + ' ' + (mm != 0 ? mm + ' phút' : '');
  }
  if (mm > 0) {
    return mm + ' phút';
  }
  return ss + 'giây';
}

export function checkStatus(openTime: string, closeTime: string) {
  const now = moment(new Date(), 'HH:mm');
  const open = moment(openTime, 'HH:mm');
  const close = moment(closeTime, 'HH:mm');
  if (now >= open && now <= close) {
    return true;
  }
  return false;
}

export function getMonthYearLong(day: Date) {
  const month = moment(day).format('MM');
  const year = moment(day).format('YYYY');
  return `Tháng ${month}, ${year}`;
}

export function changeDayInWeekToVI(day: Date) {
  const dayInWeek = moment(day).format('dddd');
  switch (dayInWeek) {
    case 'Monday':
      return 'Thứ 2';
    case 'Tuesday':
      return 'Thứ 3';
    case 'Wednesday':
      return 'Thứ 4';
    case 'Thursday':
      return 'Thứ 5';
    case 'Friday':
      return 'Thứ 6';
    case 'Saturday':
      return 'Thứ 7';
    default:
      return 'Chủ nhật';
  }
}

export function formatStringDate(dateStr: string){
  const [date, month, year] = dateStr.split('-');
  return `${year}-${month}-${date}`;
};
