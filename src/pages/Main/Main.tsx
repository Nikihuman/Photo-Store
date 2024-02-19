import cn from 'classnames';
import styles from './Main.module.scss';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { photosActions } from '../../store/photos.slice';

export function Main () {
	const searchBarState = useSelector(({floating}: RootState) => floating.searchBar);
	const sideBarState = useSelector(({floating}: RootState) => floating.sideBar);
	const dispatch = useAppDispatch();
	const email = useSelector(({user}: RootState)=> user.email);
	useEffect(()=>{
		if(email){
			dispatch(photosActions.getAllPhotos());
		}
	},[dispatch, email]);
	return(
		<div className={cn(styles.main)}>
			<Sidebar className={cn(styles.sidebar)}/>
			<div className={cn(styles.body_wrapper,
				{[styles['sidebar_hidden']]: !sideBarState},
				{[styles['search_hidden']]: !searchBarState})}>
				<SearchBar className={cn(styles.search)}/>	
				<Outlet/>
			</div>
		</div>
	);
}