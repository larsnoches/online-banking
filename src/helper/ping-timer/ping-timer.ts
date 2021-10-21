import { config } from '@helper/config';

export const setPingTimer = (f: () => void): number =>
  window.setTimeout(f, config.pingInterval);

export const clearPingTimer = (n: number): void => {
  window.clearTimeout(n);
};
