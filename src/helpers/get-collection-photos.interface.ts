export interface Profileimage {
  small: string;
  medium: string;
  large: string;
}
export interface Links {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}
export interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  instagram_username: string;
  twitter_username: string;
  profile_image: Profileimage;
  links: Links;
}
export interface Currentusercollection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
}
export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
export interface Links2 {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
export interface ICollectionPhotos {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  current_user_collections: Currentusercollection[];
  urls: Urls;
  links: Links2;
}