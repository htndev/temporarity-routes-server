import {
  All,
  Body,
  Controller,
  Headers,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpMethod } from '../constants/common.constant';
import { RequestMethod } from '../decorators/request-method.decorator';
import { GrantWorkspaceGuard } from '../guards/grant-workspace.guard';
import { TemporarityApiKeyGuard } from '../guards/temporarity-api-key.guard';
import { RoutesService } from './routes.service';

@UseGuards(TemporarityApiKeyGuard)
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @UseGuards(GrantWorkspaceGuard)
  @All(':slug/*')
  incomingRequest(
    @Param('slug') slug: string,
    @Query() query: Record<string, unknown>,
    @Body() body: any,
    @Headers() headers: Record<string, unknown>,
    @Req() request: Request,
    @Res() response: Response,
    @RequestMethod() method: HttpMethod,
  ) {
    return this.routesService.incomingRequest({
      slug,
      query,
      body,
      headers,
      request,
      method,
      response,
    });
  }
}
