export type PackageData = {
  category: string;
  comments: number;
  description: string;
  downvotes: number;
  id: number;
  license: string;
  name: string;
  readme: string;
  repository: string;
  slug: string;
  tags: string;
  updated: string;
  upvotes: number;
  vote: number;
  website: string;
};

export type CommentData = {
  added: string;
  avatar_url: string;
  login: string;
  id: number;
  text: string;
  user_id: number;
};

export type PackageResult = {
  package: PackageData;
  comments: Array<CommentData>;
};
