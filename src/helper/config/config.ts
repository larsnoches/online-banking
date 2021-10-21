import theme from './theme';

export const config = {
  apiUrl: 'http://host',
  appTitle: 'Online banking app',

  usernameMin: 5,
  usernameMax: 250,
  passwordMin: 5,
  passwordMax: 15,

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  pingInterval: 5 * 1000 * 60, // 5 minutes

  theme,
};
