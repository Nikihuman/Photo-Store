export interface IGetFavoriteList {
  message: string;
  results: PhotoResult[];
}

export interface PhotoResult {
	smallUrl: string,
	rawUrl: string,
	fullUrl: string
	width: number,
	height: number,
	photoId: string,
	username: string,
	location: string
	id: number
}

export interface IGetFavoriteListError {
  field: string;
  error_Message: string;
}