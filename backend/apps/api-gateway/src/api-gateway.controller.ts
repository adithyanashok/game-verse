import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Public()
  @Get('csrf')
  getCsrfToken() {
    return { message: 'CSRF token set' };
  }
}
