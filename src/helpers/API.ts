export const AUTH_URL = 'http://localhost:8000';

export const IMAGE_URL = 'https://api.unsplash.com/';

export const SEARCH_PHOTOS_PATH = 'search/photos';

export const SEARCH_COLLECTIONS_PATH = 'search/collections';

export const LOGIN_PATH = '/auth/login';

export const REGISTER_PATH = '/auth/register';

export const GET_USER_INFO = '/auth/info';

export const GET_FAVORITE_PHOTOS_PATH= '/photo/getAll';

export const SAVE_PHOTO_PATH = '/photo/save';

export const REMOVE_PHOTO_PATH = '/photo/remove';




export const GET_COLLECTION_PHOTOS_PATH = (id: string | undefined): string => {
	return `/collections/${id}/photos`;
};

export const GET_PHOTO_PATH =  (id: string | undefined): string => {
	return `/photos/${id}`;
};

export const CLIENT_ID = 'ottxwLExtY0qGOzctulaFzpmTEoowHfvbu4y-mhPJYY';

export interface IJWTPayload {
	email: string,
	name: string,
	iat: string
}

export const getJWTPayload = (token: string): IJWTPayload =>{
	const [, encodedPayload] = token.split('.');
	const payload: IJWTPayload = JSON.parse(atob(encodedPayload));
	return payload;
};

export const PASSWORD_ERROR_MESSAGE = 'The password length must be 8 or more symbols and contain at least two number, two lowercase letter, two uppercase letter, and do not contain spaces';


