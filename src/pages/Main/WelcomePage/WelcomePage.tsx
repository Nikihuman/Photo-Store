import cn from 'classnames';
import style from './WelcomePage.module.scss';
import { Link } from 'react-router-dom';

export function WelcomePage() {
	return (
		<div className={cn(style.welcome_page)}>
			<h1>Welcome everyone</h1>
			<div>
				<h2 className={cn(style.title)}>Description</h2>
				<div>
					<p>I want to introduce my small pet-project PhotoStore😉</p>
					<p>It is ease application witch work on react with redux toolkit</p>
				</div>
			</div>
			<div>
				<h2 className={cn(style.title)}>Instruction</h2>
				<div>
					<div>
						<p className={cn(style.subtitle)}>SEARCH</p>
						<p>
                     To search for a photo or collection, open the 'Search Bar' at the top of the
                     page.
						</p>
					</div>
					<div>
						<p className={cn(style.subtitle)}>ADD TO FAVORITES</p>
						<p>
                     If you want to add photo to 'Favorites List', before this you must start my{' '}
							<Link to="https://github.com/Nikihuman/Authorisation-API">
								{' '}
                        Authorizaition API{' '}
							</Link>
                     and then you must register. To register open the sideBar on the left side of
                     page and there bottom you can see two buttons 'Sign up' and 'Sign in'. Then
                     hover your mouse over the photo, and there you can see icon of heart. Put the
                     button😁
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
