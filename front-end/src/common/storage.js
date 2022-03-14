const tokenSlotName = "USER_SD_ACCESS";

export class DataStorage {
  constructor() {
    throw Error("No");
  }

  static set(key, data ='empty') {
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key) {
    if (typeof window !== 'undefined') {
      const data: any = localStorage.getItem(key);
      return JSON.parse(data);
    }
    return false;
  }

  static del(key) {
    localStorage.removeItem(key);
  }

  static reset() {
    localStorage.clear();
  }

  static getLength() {
    return localStorage.length;
  }

  static setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(tokenSlotName, JSON.stringify(token));
    }
  }

  static hasToken() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(tokenSlotName);
    }
    return false;
  }

  static getToken() {
    if (typeof window !== 'undefined') {
      const data: any = localStorage.getItem(tokenSlotName);
      return JSON.parse(data);
    }
    return '';
  }
}
