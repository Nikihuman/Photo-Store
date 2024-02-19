/// <reference types="vite-plugin-svgr/client" />
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import HomeIcon from '../../assets/home.svg?react';
import UserIcon from '../../assets/user.svg?react';
import PictureIcon from '../../assets/picture.svg?react';
import HeartIcon from '../../assets/heart.svg?react';
import TriangleIcon from '../../assets/triangle-right.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { floatingActions } from '../../store/floating-element.slice';
import { useState } from 'react';
import { userActions } from '../../store/user.slice';


export function Sidebar ({className, ...props}: SidebarProps) {
	const sideBarState = useSelector(({floating}: RootState) => floating.sideBar);
	const [profileState, setProfileState] = useState<boolean>(false);
	const jwt = useSelector(({user}: RootState)=>user.jwt);
	const dispatch = useDispatch();

	return(
		<nav className={cn(className, styles.nav, {[styles['nav_hidden']]: !sideBarState})} {...props}>
			<Button className={cn(styles.opened_nav_button)}
				onClick={()=>{dispatch(floatingActions.sideBarController());}}>
				<TriangleIcon className={cn({[styles['triangle_left']]: sideBarState})}/>
			</Button>
			<div className={cn(styles.nav_head)}>
				<PictureIcon />
				<span>{'Photo\nStore'}</span>
			</div>
			<div className={cn(styles.nav_link_wapper)}>
				<NavLink to='/'
					className={cn(styles.nav_link)}>
					<HomeIcon/>
					Home
				</NavLink>
				{<div className={cn(styles.profile)}>
					<button className={cn(styles.profile_button,
						{[styles['profile_button_active']]: profileState})}
					onClick={()=>{setProfileState(state=> !state);}}>
						<UserIcon/>Profile
					</button>
					<div className={cn(styles.profile_items, {[styles['profile_items_opened']]: profileState})}>
						<NavLink to='/favorite' className={cn(styles.profile_items_link)}><HeartIcon/>Favorites</NavLink>
					</div>
				</div>}
			</div>
			<div className={cn(styles.nav_buttons_wrapper)}>
				{jwt ? 
					<>
						<Button className={cn(styles.nav_button)}
							onClick={()=>{dispatch(userActions.logout());}}>Logout</Button>
					</> :
					<>
						<Link to='/auth/login'><Button className={cn(styles.nav_button)}>Sign In</Button></Link>
						<Link to='/auth/register'><Button className={cn(styles.nav_button)}>Sign Up</Button></Link>
					</>
				}
			</div>
		</nav>
	);
}