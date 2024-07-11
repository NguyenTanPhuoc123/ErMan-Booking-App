import unorm from 'unorm';

export const removeAccents = (text:string) => {
    return unorm.nfkd(text)
      .replace(/[\u0300-\u036f]/g, '');
  };