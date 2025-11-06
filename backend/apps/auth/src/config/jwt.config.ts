import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    jwtAccessTokenTTL: parseInt(
      process.env.JWT_ACCESS_TOKEN_TTL || '36000',
      10,
    ),
    jwtRefreshTokenTTL: parseInt(
      process.env.JWT_REFRESH_TOKEN_TTL || '86400',
      10,
    ),
  };
});
