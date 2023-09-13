import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlockDto } from './block.dto';

@ApiTags('friends/block')
@Controller('friends/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHello(): string {
    return this.blockService.getHello();
  }

  @Get('blockers')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getBlockers(@Req() req) {
    return this.blockService.getBlocks(undefined, req.user.id);
  }

  @Get('blockeds')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getBlockeds(@Req() req) {
    return this.blockService.getBlocks(req.user.id, undefined);
  }

  @Get('blockers/:blockedId')
  getBlockersOfOthers(@Param('blockedId', ParseIntPipe) blockedId: number) {
    return this.blockService.getBlocks(undefined, blockedId);
  }

  @Get('blockeds/:blockerId')
  getBlockedsOfOthers(@Param('blockerId', ParseIntPipe) blockerId: number) {
    return this.blockService.getBlocks(blockerId, undefined);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  block(@Req() req, @Body() blockDto: BlockDto) {
    return this.blockService.setBlock(req.user.id, blockDto.blockedId);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  unblock(@Req() req, @Body() blockDto: BlockDto) {
    return this.blockService.deleteBlock(req.user.id, blockDto.blockedId);
  }
}
