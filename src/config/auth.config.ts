import { registerAs } from '@nestjs/config';

export const authConfig = {
  cryptSalt: process.env.CRYPT_SALT || 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
  jwtSecretRefreshKey: process.env.JWT_SECRET_REFRESH_KEY || 'secret',
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || '1h',
  tokenRefreshExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
};

export default registerAs('auth', () => authConfig);
