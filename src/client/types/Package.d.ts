export type PackageFormData = {
  category: string;
  description: string;
  image_id: number;
  image?: any;
  license: string;
  name: string;
  readme: string;
  repository: string;
  slug: string;
  tags: string;
  website: string;
};

export type PackageData = {
  comments: number;
  downvotes: number;
  id: number;
  owner: string;
  updated: string;
  upvotes: number;
  user_id: number;
  vote: number;
} & PackageFormData;

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

export type PackagesResult = {
  packages: PackageData[];
  count: number;
  totalPages: number;
};
