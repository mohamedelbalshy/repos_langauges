import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  // Inject the Language service (dependency injection)
  constructor(private readonly languagesService: LanguagesService) {}

  // list all languages
  @Get('')
  async get() {
    return this.languagesService.getLanguages();
  }
}
