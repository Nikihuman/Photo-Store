import { PayloadAction } from '@reduxjs/toolkit';
import { IRegisterForm, IRegisterResponse } from '../helpers/register.interface';
import axios, { AxiosError } from 'axios';
import { AUTH_URL, GET_USER_INFO, LOGIN_PATH, REGISTER_PATH, getJWTPayload } from '../helpers/API';
import { ILoginForm, ILoginResponse } from '../helpers/login.interface';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { IUserInfoResponse } from '../helpers/user-info.interface';
import { RootState } from './store';

export const JWT_KEY = 'userData';

const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});

export interface IRejectValue {
	field: 'email' | 'password' | 'name'| 'authorization' | 'photo',
	error_Message: string
}

export interface IJWTPersistentState {
	jwt: string | null; 
}


export interface IUserState {
	jwt: string | null;
	email: string | null;
	name: string | null;
	loginErrorMessages: {
		email?: string,
		password?: string
	}
	registerErrorMessages: {
		email?: string,
		password?: string
		name?: string
	}
}

const initialState: IUserState = {
	jwt: loadState<IJWTPersistentState>(JWT_KEY)?.jwt ?? null,
	email: null,
	name: null,
	loginErrorMessages: {email: undefined, password: undefined},
	registerErrorMessages: {email: undefined, password: undefined, name: undefined}
};

const userSlice = createAppSlice({
	name: 'user',
	initialState,
	reducers: (create) =>({
		login: create.asyncThunk<ILoginResponse, ILoginForm, { rejectValue: IRejectValue[] }>(
			async ({email, password }: ILoginForm, thunkApi): Promise<ILoginResponse> => {
				try{
					const res = await axios.post<ILoginResponse>(AUTH_URL+LOGIN_PATH,
						{ email, password });
					return res.data;
				} catch(e){
					if(e instanceof AxiosError){
						throw thunkApi.rejectWithValue(e.response?.data);
					}
					throw thunkApi.rejectWithValue([{field: 'email', error_Message: 'Somthing went wrong'}]);
				}
			},
			{
				rejected: (state, {payload}) => {
					if(payload) {
						state.loginErrorMessages.email = payload.find((el)=>el.field ==='email')?.error_Message;
						state.loginErrorMessages.password = payload.find((el)=>el.field ==='password')?.error_Message;
					}
				},
				fulfilled: (state, {payload}: PayloadAction<{message: string, access_token: string}>) => {
					state.jwt = payload.access_token;
					const jwtPayload = getJWTPayload(payload.access_token);
					state.email = jwtPayload.email;
					state.name = jwtPayload.name;
				}
			}
		),
		register: create.asyncThunk<ILoginResponse, IRegisterForm, { rejectValue: IRejectValue[] }>(
			async ({email, password, name }: IRegisterForm, thunkApi): Promise<IRegisterResponse> => {
				try{
					const res = await axios.post<IRegisterResponse>(AUTH_URL+REGISTER_PATH,
						{ email, password, name });
					return res.data;
				} catch(e){
					if(e instanceof AxiosError){
						throw thunkApi.rejectWithValue(e.response?.data);
					}
					throw thunkApi.rejectWithValue([{field: 'email', error_Message: 'Somthing went wrong'}]);
				}
			},
			{
				rejected: (state, {payload}) => {
					if(payload) {
						state.registerErrorMessages.email = payload.find((el)=>el.field ==='email')?.error_Message;
						state.registerErrorMessages.password = payload.find((el)=>el.field ==='password')?.error_Message;
						state.registerErrorMessages.name = payload.find((el)=>el.field ==='name')?.error_Message;
					}
				},
				fulfilled: (state, {payload}: PayloadAction<{message: string, access_token: string}>) => {
					state.jwt = payload.access_token;
					const jwtPayload = getJWTPayload(payload.access_token);
					state.email = jwtPayload.email;
					state.name = jwtPayload.name;
				}
			}
		), 
		getUserInfo: create.asyncThunk<IUserInfoResponse>(
			async (_args, thunkApi): Promise<IUserInfoResponse> => {
				try{
					const state = thunkApi.getState() as RootState;
					
					const res = await axios.get<IUserInfoResponse>(AUTH_URL + GET_USER_INFO,{
						headers:{
							Authorization: `Bearer ${state.user.jwt}`
						}
					});
					return res.data;
				} catch(e){
					if(e instanceof AxiosError){
						throw thunkApi.rejectWithValue(e.response?.data);
					}
					throw thunkApi.rejectWithValue([{field: 'authorization', error_Message: 'Somthing went wrong'}]);
				}
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				rejected: (_state, _payload) => {
					
				},
				fulfilled: (state, {payload}: PayloadAction<IUserInfoResponse>) => {
					state.email = payload.email;
					state.name = payload.name;
				}
			}
		),
		clearErrorsMessages: create.reducer(state => {
			state.loginErrorMessages = initialState.loginErrorMessages;
			state.registerErrorMessages = initialState.registerErrorMessages;
		}),
		addRegisterErrorsMessages: create.reducer<{email: string, password: string, name: string}>((state, {payload}) =>{
			const {email, password, name} = payload;
			state.registerErrorMessages.email = email || undefined;
			state.registerErrorMessages.password = password || undefined;
			state.registerErrorMessages.name = name || undefined;
		}),
		addLoginErrorsMessages: create.reducer<{email: string, password: string}>((state, {payload}) =>{
			const {email, password} = payload;
			state.loginErrorMessages.email = email || undefined;
			state.loginErrorMessages.password = password || undefined;
		}),
		logout: create.reducer((state) =>{
			state.email = null;
			state.jwt = null;
			state.name = null;
		})
	})
});

export default userSlice.reducer;
export const userActions = userSlice.actions;