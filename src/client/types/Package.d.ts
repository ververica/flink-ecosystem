export type PackageData = {
  category: string;
  comments: number;
  description: string;
  downvotes: number;
  id: number;
  image_id: number;
  image?: any;
  license: string;
  name: string;
  owner: string;
  readme: string;
  repository: string;
  slug: string;
  tags: string;
  updated: string;
  upvotes: number;
  user_id: number;
  vote: number;
  website: string;
};

export type CommentData = {
  added: string;
  avatar_url: string;
  id: number;
  login: string;
  text: string;
  updated: string;
  user_id: number;
  name: string;
  slug: string;
};

export type PackageResult = {
  comments: CommentData[];
  package: PackageData;
};
