class LocalStorageHelper {
  static key(index: number): string | null {
    try {
      return localStorage.key(index);
    } catch (err) {
      //
    }
    return null;
  }

  static setItem(key: string, val: string): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (err) {
      //
    }
  }

  static getItem(key: string): string | null {
    try {
      const val = localStorage.getItem(key);
      if (val == null) return null;
      return JSON.parse(val) as string;
    } catch (err) {
      //
    }
    return null;
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      //
    }
  }
}

export default LocalStorageHelper;
