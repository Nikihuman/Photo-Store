export interface ISearchCollections {
  total: number;
  total_pages: number;
  results: IResultOfSearchCollection[];
}

export interface IResultOfSearchCollection {
  id: number;
  title: string;
  description?: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: Coverphoto;
  user: User2;
  links: Links3;
}

export interface Links3 {
  self: string;
  html: string;
  photos: string;
  related: string;
}

export interface User2 {
  id: string;
  username: string;
  name: string;
  bio: string;
  profile_image: Profileimage;
  links: Links;
}

export interface Coverphoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  urls: Urls;
  links: Links2;
}

export interface Links2 {
  self: string;
  html: string;
  download: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: Profileimage;
  links: Links;
}

export interface Links {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface Profileimage {
  small: string;
  medium: string;
  large: string;
}