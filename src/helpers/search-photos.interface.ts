export interface ISearchPhotos {
   total: number;
   total_pages: number;
   results: IResultOfSearchPhoto[];
}

export interface IResultOfSearchPhoto {
   id: string;
   slug: string;
   created_at: string;
   updated_at: string;
   promoted_at: string;
   width: number;
   height: number;
   color: string;
   blur_hash: string;
   description: string;
   alt_description: string;
   breadcrumbs: Breadcrumb[];
   urls: Urls;
   links: Links;
   likes: number;
   liked_by_user: boolean;
   user: User;
   tags: Tag[];
}

export interface Tag {
   type: string;
   title: string;
   source?: Source;
}

export interface Source {
   ancestry: Ancestry;
   title: string;
   subtitle: string;
   description: string;
   meta_title: string;
   meta_description: string;
   cover_photo: Coverphoto;
}

export interface Coverphoto {
   id: string;
   slug: string;
   created_at: string;
   updated_at: string;
   promoted_at: string;
   width: number;
   height: number;
   color: string;
   blur_hash: string;
   description: string;
   alt_description: string;
   breadcrumbs: Breadcrumb[];
   urls: Urls;
   links: Links;
   likes: number;
   liked_by_user: boolean;
   premium: boolean;
   plus: boolean;
   user: User2;
}

export interface User2 {
   id: string;
   updated_at: string;
   username: string;
   name: string;
   first_name: string;
   last_name: string;
   portfolio_url: string;
   location: string;
   links: Links2;
   profile_image: Profileimage;
   instagram_username: string;
   total_collections: number;
   total_likes: number;
   total_photos: number;
   total_promoted_photos: number;
   accepted_tos: boolean;
   for_hire: boolean;
   social: Social2;
}

export interface Social2 {
   instagram_username: string;
   portfolio_url: string;
}

export interface Ancestry {
   type: Type;
   category: Type;
   subcategory: Type;
}

export interface Type {
   slug: string;
   pretty_slug: string;
}

export interface User {
   id: string;
   updated_at: string;
   username: string;
   name: string;
   first_name: string;
   last_name: string;
   twitter_username?: string;
   portfolio_url?: string;
   bio?: string;
   location: string;
   links: Links2;
   profile_image: Profileimage;
   instagram_username: string;
   total_collections: number;
   total_likes: number;
   total_photos: number;
   total_promoted_photos: number;
   accepted_tos: boolean;
   for_hire: boolean;
   social: Social;
}

export interface Social {
   instagram_username: string;
   portfolio_url?: string;
   twitter_username?: string;
}

export interface Profileimage {
   small: string;
   medium: string;
   large: string;
}

export interface Links2 {
   self: string;
   html: string;
   photos: string;
   likes: string;
   portfolio: string;
   following: string;
   followers: string;
}

export interface Links {
   self: string;
   html: string;
   download: string;
   download_location: string;
}

export interface Urls {
   raw: string;
   full: string;
   regular: string;
   small: string;
   thumb: string;
   small_s3: string;
}

export interface Breadcrumb {
   slug: string;
   title: string;
   index: number;
   type: string;
}
