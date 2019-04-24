export interface Votes {
  username: string;
  repo: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  image: string;
  website: string;
  repository: string;
  license: string;
  upvotes: Array<Votes>;
  downvotes: Array<Votes>;
  tags: Array<string>;
  added: string;
}
