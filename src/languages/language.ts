import { Repo } from './repo';

export class Language {
  constructor(name: String) {
    this.name = name;
    this.repos = [];
    this.numberOfRepos = 0;
  }
  name: String;

  numberOfRepos = 0;

  repos: Repo[];

  addRepo(repo: any) {
    this.repos.push(repo);
    console.log(this.repos);
    this.numberOfRepos += 1;
  }
}
