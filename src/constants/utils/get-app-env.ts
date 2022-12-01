export function getAppEnv() {
  const env = (process.env.NODE_ENV || '').toUpperCase();

  switch (env) {
    case 'TEST':
      return '.env.test';
    case 'CI':
      return '.env.ci';
    default:
      return '.env';
  }
}
