import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceRouteResponse } from '../db/entities/workspace-route-response.entity';
import { WorkspaceRoute } from '../db/entities/workspace-route.entity';
import { Workspace } from '../db/entities/workspace.entity';
import { WorkspaceRouteResponseRepository } from '../db/repositories/workspace-route-response.repository';
import { WorkspaceRouteRepository } from '../db/repositories/workspace-route.repository';
import { WorkspaceRepository } from '../db/repositories/workspace.repository';
import { GeneratorProvider } from '../providers/generator.provider';
import { provideCustomRepository } from '../utils/db.util';
import { TemporarityApiKeyGuard } from './../guards/temporarity-api-key.guard';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workspace,
      WorkspaceRoute,
      WorkspaceRouteResponse,
    ]),
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    GeneratorProvider,
    provideCustomRepository(Workspace, WorkspaceRepository),
    provideCustomRepository(WorkspaceRoute, WorkspaceRouteRepository),
    provideCustomRepository(
      WorkspaceRouteResponse,
      WorkspaceRouteResponseRepository,
    ),
  ],
})
export class RoutesModule {}
