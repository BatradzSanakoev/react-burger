import { refresh } from '../services/actions/user';
import { TRefresh } from './types';

export const MAIN_API = 'https://norma.nomoreparties.space/api';
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  const token = cookies.find(cookie => (cookie.indexOf(name) !== -1 ? cookie : null));
  if (token === undefined) return;
  return name === 'accessToken' ? token.slice(12) : token.slice(13);
};

export const setCookies = (data: TRefresh) => {
  document.cookie = `accessToken=${data.accessToken!.slice(7)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  document.cookie = `refreshToken=${data.refreshToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const retriableFetch = async <ReturnType>(url: RequestInfo, options?: RequestInit | undefined | any): Promise<ReturnType> => {
  try {
    return await fetch(url, options).then(async res => {
      if (res.ok) return res.json() as Promise<ReturnType>;
      const err = (await res.json()) as Promise<ReturnType>;
      return await Promise.reject(err);
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      const refreshTokens = await refresh();
      setCookies(refreshTokens);
      if (!options!.headers) {
        options!.headers = {};
      }
      options!.headers.authorization = getCookie('refreshToken');
      return await fetch(url, options).then(async res => {
        if (res.ok) return res.json() as Promise<ReturnType>;
        const err = (await res.json()) as Promise<ReturnType>;
        return await Promise.reject(err);
      });
    } else throw err;
  }
};
