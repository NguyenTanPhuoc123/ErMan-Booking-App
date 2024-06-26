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
