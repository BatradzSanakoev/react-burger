import { refresh } from '../services/actions/user';
import { TRefresh } from './types';

export const MAIN_API = 'https://norma.nomoreparties.space/api';
export const WS_Url = 'wss://norma.nomoreparties.space/orders';
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// export const getCookie = (name: string) => {
//   const cookies = document.cookie.split('; ');
//   const token = cookies.find(cookie => (cookie.indexOf(name) !== -1 ? cookie : null));
//   console.log(document.cookie);
//   if (token === undefined) return;
//   return name === 'accessToken' ? token.slice(12) : token.slice(13);
// };

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// export const setCookies = (data: TRefresh) => {
//   document.cookie = `accessToken=${data.accessToken!.slice(7)}; path='/'; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
//   document.cookie = `refreshToken=${data.refreshToken}; path='/'; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
// };

export const setCookies = (name: string, value: string | number | boolean | null | undefined, props: any = {}) => {
  props = {
    path: '/',
    expires: 'Fri, 31 Dec 9999 23:59:59 GMT',
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value!);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookies = (name: string) => {
  setCookies(name, null, { expires: -1 });
};

export const retriableFetch = async <ReturnType>(url: RequestInfo, options?: RequestInit | undefined | any): Promise<ReturnType> => {
  try {
    return await fetch(url, options).then(async res => {
      if (res.ok) return res.json() as Promise<ReturnType>;
      const err = (await res.json()) as Promise<ReturnType>;
      return await Promise.reject(err);
    });
  } catch (err) {
    if ((err as Error).message! === 'jwt expired') {
      const refreshTokens = await refresh();
      const accessToken = refreshTokens.accessToken!.split('Bearer ')[1];
      setCookies('accessToken', accessToken);
      setCookies('refreshToken', refreshTokens.refreshToken);
      console.log(refreshTokens);
      if (!options!.headers) {
        options!.headers = {};
      }
      options!.headers.authorization = getCookie('accessToken');
      return await fetch(url, options).then(async res => {
        if (res.ok) return res.json() as Promise<ReturnType>;
        const err = (await res.json()) as Promise<ReturnType>;
        return await Promise.reject(err);
      });
    } else throw err;
  }
};

export const getDate = (date: string) => {
  const currentDate = new Date();
  if (date.slice(0, 10) === currentDate.toISOString().slice(0, 10)) return `Сегодня, ${date.slice(11, 16)} i-GMT+3`;
  else return `${date.slice(0, 10)}, ${date.slice(11, 16)} i-GMT+3`;
};
