import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  imports: [HttpModule],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
