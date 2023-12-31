import {
  Controller,
  Get,
  Request,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './chats.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserType } from './chats.interface';

@Controller('chats')
@ApiTags('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: 'チャンネルを作成する' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({
    status: 201,
    description: '作成したチャンネル情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createChannel(
    @Request() req,
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<ChannelInfoDto> {
    // jwt から userID を取り出す
    createChannelDto.ownerId = req.user.id;
    return await this.chatsService.createChannel(createChannelDto);
  }

  @ApiOperation({ summary: 'userが所属するチャンネル一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'userが所属するチャンネル一覧を返却',
    type: [ChannelInfoDto],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllChannel(@Request() req) {
    const userId = req.user.id;
    return await this.chatsService.findAllChannelByUserId(userId);
  }

  @ApiOperation({ summary: 'チャンネルを検索する' })
  @ApiQuery({
    name: 'channelName',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Get('search')
  async findByChannelName(
    @Query('channelName') channelName: string,
  ): Promise<ChannelInfoDto> {
    console.log(channelName);
    return await this.chatsService.findByChannelName(channelName);
  }

  @ApiOperation({ summary: 'public なチャンネル一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'public なチャンネル一覧を返却',
    type: [ChannelInfoDto],
  })
  @Get('public')
  async findAllPublicChannel() {
    return await this.chatsService.findAllPublicChannel();
  }

  @ApiOperation({ summary: '指定したチャンネルの情報を取得する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Get(':channelid')
  async findById(
    @Param('channelid') channelId: string,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.findById(Number(channelId));
  }

  @ApiOperation({ summary: 'チャンネル情報を更新する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({ type: UpdateChannelDto })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':channelid')
  async updateChannel(
    @Param('channelid') channelId: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.updateChannel(
      Number(channelId),
      updateChannelDto,
    );
  }

  @ApiOperation({ summary: 'チャンネルを削除する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '戻り値なし',
    type: null,
  })
  @Delete(':channelid')
  async deleteChannel(@Param('channelid') channelId: string): Promise<void> {
    return await this.chatsService.deleteChannel(Number(channelId));
  }

  @ApiOperation({ summary: 'Admin権限を付与する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':channelid/admins')
  async addAdminRights(
    @Param('channelid') channelId: string,
    @Body() addAdminRequest: { userId: string },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.addChannelUsers(
      Number(channelId),
      Number(addAdminRequest.userId),
      UserType.ADMIN,
      Number(req.user.id),
    );
  }

  @ApiOperation({ summary: 'Admin権限をはく奪する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':channelid/admins/:userid')
  async removeAdminRights(
    @Param('channelid') channelId: string,
    @Param('userid') userId: string,
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.removeChannelUsers(
      Number(channelId),
      Number(userId),
      UserType.ADMIN,
      Number(req.user.id),
    );
  }

  @ApiOperation({ summary: 'チャンネルに入室する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':channelid/users')
  async joinChannel(
    @Param('channelid') channelId: string,
    @Body() joinRequest: { password: string },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.addChannelUsers(
      Number(channelId),
      req.user.id,
      UserType.USER,
      req.user.id,
      joinRequest.password,
    );
  }

  @ApiOperation({ summary: 'チャンネルから退室する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/users')
  async leaveChannel(
    @Param('channelid') channelId: string,
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.removeChannelUsers(
      Number(channelId),
      Number(req.user.id),
      UserType.USER,
      req.user.id,
    );
  }

  @ApiOperation({ summary: '他の人をチャンネルから退室させる' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/users/:userid')
  async leaveOthersFromChannel(
    @Param('channelid') channelId: string,
    @Param('userid') userId: string,
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.removeChannelUsers(
      Number(channelId),
      Number(userId),
      UserType.USER,
      req.user.id,
    );
  }

  @ApiOperation({ summary: '現在Banしているユーザ一覧を取得する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
  })
  @Get(':channelid/ban')
  async getBans(
    @Param('channelid') channelId: string,
  ): Promise<{ bannedUsers: number[] }> {
    return await this.chatsService.getBans(Number(channelId));
  }

  @ApiOperation({ summary: 'ユーザをBanする' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        bannedUserId: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':channelid/ban')
  async banUser(
    @Param('channelid') channelId: string,
    @Body() banRequest: { bannedUserId: string },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.banUser(
      Number(channelId),
      Number(banRequest.bannedUserId),
      req.user.id,
    );
  }

  @ApiOperation({ summary: 'ユーザのBanを解除する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        bannedUserId: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':channelid/ban')
  async unbanUser(
    @Param('channelid') channelId: string,
    @Body() unbanRequest: { bannedUserId: string },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.unbanUsers(
      Number(channelId),
      Number(unbanRequest.bannedUserId),
      req.user.id,
    );
  }

  @ApiOperation({
    summary: '現在Muteしているユーザ一覧を取得する(タイムアウトは含まない)',
  })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: Array<{ mutedUserId: number; muteUntil: Date }>,
  })
  @Get(':channelid/mute')
  async getActiveMutes(
    @Param('channelid') channelId: string,
  ): Promise<Array<{ mutedUserId: number; muteUntil: Date }>> {
    return await this.chatsService.getActiveMutes(Number(channelId));
  }

  @ApiOperation({ summary: 'ユーザをMuteする' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        mutedUserId: {
          type: 'string',
          example: '1',
        },
        muteUntil: {
          type: 'Date',
          example: new Date(new Date().getTime() + 1000 * 60 * 3), // 3分後
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':channelid/mute')
  async muteUser(
    @Param('channelid') channelId: string,
    @Body() muteRequest: { mutedUserId: string; muteUntil: Date },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.muteUser(
      Number(channelId),
      Number(muteRequest.mutedUserId),
      muteRequest.muteUntil,
      req.user.id,
    );
  }

  @ApiOperation({ summary: 'ユーザのMuteを解除する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        mutedUserId: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':channelid/mute')
  async unmuteUser(
    @Param('channelid') channelId: string,
    @Body() unmuteRequest: { mutedUserId: string },
    @Request() req,
  ): Promise<ChannelInfoDto> {
    return await this.chatsService.unmuteUsers(
      Number(channelId),
      Number(unmuteRequest.mutedUserId),
      req.user.id,
    );
  }
}
