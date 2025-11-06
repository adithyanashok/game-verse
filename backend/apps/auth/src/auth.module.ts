import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG, ServiceName } from 'libs/common/src';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? 'apps/auth/.env' : `apps/auth/.env.${ENV}`,
      load: [jwtConfig],
    }),
    JwtModule.registerAsync(jwtConfig.asProvider()),

    ClientsModule.register([
      {
        name: ServiceName.USER,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICE_CONFIG.USER_SERVICE.host,
          port: MICROSERVICE_CONFIG.USER_SERVICE.port,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtAuthGuard, LocalAuthGuard],
})
export class AuthModule {}
