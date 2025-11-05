import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DB,
  synchronize: process.env.POSTGRES_DB_SYNC === 'true' ? true : false,
  autoLoadEntities:
    process.env.POSTGRES_DB_LOAD_ENTITY === 'true' ? true : false,
}));
