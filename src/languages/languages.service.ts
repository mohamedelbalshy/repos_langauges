import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Language } from './language';
import { Repo } from './repo';

@Injectable()
export class LanguagesService {
  constructor(private readonly httpService: HttpService) {}
  private async getRepos() {
    try {
      const response: Observable<
        AxiosResponse<{
          items: any[];
          total_count: Number;
          incomplete_results: Boolean;
        }>
      > = this.httpService.get(
        `https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc`,
      );

      // convert to promise
      const responsePromise = await response.toPromise();

      // extract the data from the response
      const { data } = responsePromise;
      // return only the array of repos
      return data.items;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error when trying to fetch the repos from Github',
      );
    }
  }

  async getLanguages() {
    // get the repos data
    const repos = await this.getRepos();

    // declare languages array

    const languages: Language[] = [];

    // loop through the incoming repos
    // check if language of the repo already exists => add this repo to the language
    // else => create new language and add this repo to the new created language

    for (const repo of repos) {
      const languageExists = languages.find(
        (language) => repo.language === language.name,
      );
      if (languageExists) {
        languageExists.addRepo(repo);
      } else {
        const language = new Language(repo.language);
        language.addRepo(repo);
        languages.push(language);
      }
    }

    return languages;
  }
}
