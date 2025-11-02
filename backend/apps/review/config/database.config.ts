import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  name: process.env.MYSQL_DB,
  synchronize: process.env.MYSQL_DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.MYSQL_DB_LOAD_ENTITY === 'true' ? true : false,
}));
