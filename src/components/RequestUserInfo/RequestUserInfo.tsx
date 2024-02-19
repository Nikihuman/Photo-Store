import { IRequestUserInfo } from './RequestUserInfo.props';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { useLayoutEffect } from 'react';
import { userActions } from '../../store/user.slice';

export function RequestUserInfo ({children}: IRequestUserInfo){
	const jwt = useSelector(({user}: RootState)=> user.jwt);
	const dispatch = useAppDispatch();

	useLayoutEffect(()=>{
		if(jwt){
			dispatch(userActions.getUserInfo());
		}
	},[jwt, dispatch]);

	return(
		<>
			{children}
		</>
	);
}