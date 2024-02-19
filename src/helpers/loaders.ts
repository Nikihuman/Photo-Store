import axios from 'axios';
import { LoaderFunctionArgs } from 'react-router-dom';
import { IMAGE_URL, SEARCH_PHOTOS_PATH, SEARCH_COLLECTIONS_PATH, CLIENT_ID, GET_PHOTO_PATH, GET_COLLECTION_PHOTOS_PATH } from './API';

export interface ISearchLoaderParams {
	areaId: string,
	query: string,
	page: string
}

export const searchLoader = async ({params}:LoaderFunctionArgs<unknown>): Promise<{
    data: unknown;
    total: unknown;
}> =>{
	const {data, ...res} = await axios.get(`${IMAGE_URL}${params.areaId === '1' ? 
		SEARCH_PHOTOS_PATH : SEARCH_COLLECTIONS_PATH}`,
	{
		headers: {
			Authorization: `Client-ID ${CLIENT_ID}`
		},
		params: {
			page: params.page,
			query: params.query,
			per_page: 24
		}
	});
	return {data, total: res.headers['x-total']};
};

export const getPhotoLoader = async ({params}:LoaderFunctionArgs<unknown>): Promise<unknown> =>{
	const {data} = await axios.get(`${IMAGE_URL}${GET_PHOTO_PATH(params.photoId)}`,
		{
			headers: {
				Authorization: `Client-ID ${CLIENT_ID}`
			},
			params: {
				id: params.photoId
			}
		});
	return data;
};

export const getCollectionPhotosLoader = async ({params}:LoaderFunctionArgs<unknown>): Promise<unknown> =>{
	
	const {data, ...res} = await axios.get(`${IMAGE_URL}${GET_COLLECTION_PHOTOS_PATH(params.id)}`,
		{
			headers: {
				Authorization: `Client-ID ${CLIENT_ID}`
			},
			params: {
				per_page: 24,
				page: params.page,
				id: params.id
			}
		});
	return {data, total: res.headers['x-total']};
};

