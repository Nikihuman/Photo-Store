import { PayloadAction, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { IGetFavoriteList, PhotoResult } from '../helpers/get-favorite-list.interface';
import { Nullable } from '../helpers/other';
import { IRejectValue } from './user.slice';
import {
	AUTH_URL,
	GET_FAVORITE_PHOTOS_PATH,
	REMOVE_PHOTO_PATH,
	SAVE_PHOTO_PATH
} from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { RootState } from './store';
import { ISavePhotoForm } from '../helpers/savePhoto.interface';

export interface IPhotosState {
   results: PhotoResult[];
   errorMessage: Nullable<string>;
}

const initialState: IPhotosState = {
	results: [],
	errorMessage: null
};

const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});

const photosSlice = createAppSlice({
	name: 'photos',
	initialState,
	reducers: create => ({
		getAllPhotos: create.asyncThunk<IGetFavoriteList, void, { rejectValue: IRejectValue[] }>(
			async (_args, { rejectWithValue, ...thunkApi }): Promise<IGetFavoriteList> => {
				try {
					const { user } = thunkApi.getState() as RootState;
					if (!user.jwt || !user.email) {
						throw rejectWithValue([
							{ field: 'authorization', error_Message: 'No access to this area' }
						]);
					}
					const res = await axios.post<IGetFavoriteList>(
						AUTH_URL + GET_FAVORITE_PHOTOS_PATH,
						{
							email: user.email
						},
						{
							headers: {
								Authorization: `Bearer ${user.jwt}`
							}
						}
					);
					return res.data;
				} catch (e) {
					if (e instanceof AxiosError) {
						throw rejectWithValue(e.response?.data);
					}
					throw rejectWithValue([
						{ field: 'authorization', error_Message: 'Somthing went wrong' }
					]);
				}
			},
			{
				rejected: (state, { payload }) => {
					if (payload) {
						state.errorMessage =
                     payload.find(el => el.field === 'photo')?.error_Message ?? null;
					}
				},
				fulfilled: (state, { payload }: PayloadAction<IGetFavoriteList>) => {
					state.results = payload.results;
				}
			}
		),
		savePhoto: create.asyncThunk<
         { message: string; photo: PhotoResult },
         ISavePhotoForm,
         { rejectValue: IRejectValue[] }
      >(
      	async (args, thunkApi): Promise<{ message: string; photo: PhotoResult }> => {
      		try {
      			const { user } = thunkApi.getState() as RootState;
      			if (!user.jwt || !user.email) {
      				throw thunkApi.rejectWithValue([
      					{ field: 'authorization', error_Message: 'No access to this area' }
      				]);
      			}
      			const res = await axios.post(
      				AUTH_URL + SAVE_PHOTO_PATH,
      				{
      					...args
      				},
      				{
      					headers: {
      						Authorization: `Bearer ${user.jwt}`
      					}
      				}
      			);
      			return { message: res.data.message, photo: res.data.photo };
      		} catch (e) {
      			if (e instanceof AxiosError) {
      				throw thunkApi.rejectWithValue(e.response?.data);
      			}
      			throw thunkApi.rejectWithValue([
      				{ field: 'authorization', error_Message: 'Somthing went wrong' }
      			]);
      		}
      	},
      	{
      		rejected: (state, { payload }) => {
      			if (payload) {
      				state.errorMessage =
                     payload.find(el => el.field === 'photo')?.error_Message ?? null;
      			}
      		},
      		fulfilled: (state, { payload }) => {
      			state.results.push(payload.photo);
      		}
      	}
      ),
		removePhoto: create.asyncThunk<
         { message: string; id: number },
         { id: number },
         { rejectValue: IRejectValue[] }
      >(
      	async ({ id }, thunkApi): Promise<{ message: string; id: number }> => {
      		try {
      			const { user } = thunkApi.getState() as RootState;
      			if (!user.jwt || !user.email) {
      				throw thunkApi.rejectWithValue([
      					{ field: 'authorization', error_Message: 'No access to this area' }
      				]);
      			}
      			const res = await axios.post(
      				AUTH_URL + REMOVE_PHOTO_PATH,
      				{
      					id
      				},
      				{
      					headers: {
      						Authorization: `Bearer ${user.jwt}`
      					}
      				}
      			);
      			return { message: res.data, id };
      		} catch (e) {
      			if (e instanceof AxiosError) {
      				throw thunkApi.rejectWithValue(e.response?.data);
      			}
      			throw thunkApi.rejectWithValue([
      				{ field: 'photo', error_Message: 'Somthing went wrong' }
      			]);
      		}
      	},
      	{
      		rejected: (state, { payload, ...action }) => {
      			if (payload) {
      				state.errorMessage =
                     payload.find(el => el.field === 'photo')?.error_Message ?? null;
      				return;
      			}
      			state.errorMessage = action.error.message ?? 'Somthing went wrong';
      		},
      		fulfilled: (state, { payload }) => {
      			state.results = state.results.filter(el => el.id !== payload.id);
      		}
      	}
      )
	})
});

export default photosSlice.reducer;
export const photosActions = photosSlice.actions;
