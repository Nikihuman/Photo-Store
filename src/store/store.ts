import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_KEY } from './user.slice';
import floatingElementSlice  from './floating-element.slice';
import { saveState } from './storage';
import photosSlice from './photos.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		user: userSlice,
		floating: floatingElementSlice,
		photos: photosSlice
	}
});

store.subscribe(()=>{
	saveState(JWT_KEY, {jwt: store.getState().user.jwt});
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

