import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ChatsModule, ProfilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
