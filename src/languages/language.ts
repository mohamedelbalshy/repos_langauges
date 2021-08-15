export class Language {
  constructor(name: String) {
    this.name = name;
  }
  name: String;

  numberOfRepos = 0;

  repos = [];

  addRepo(repo: any): void {
    this.repos.push(repo);
    this.numberOfRepos += 1;
  }
}
