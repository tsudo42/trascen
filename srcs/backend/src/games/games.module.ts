import { Module } from '@nestjs/common';
import { GamesMatchingGateway } from './games.matching.gateway';
import { GamesPlayGateway } from './games.play.gateway';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { StatusModule } from 'src/status/status.module';
import { DmsModule } from 'src/dms/dms.module';

@Module({
  providers: [GamesMatchingGateway, GamesPlayGateway, GamesService],
  controllers: [GamesController],
  imports: [PrismaModule, UsersModule, StatusModule, DmsModule],
  exports: [GamesMatchingGateway],
})
export class GamesModule {}
