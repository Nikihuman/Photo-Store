import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import style from './AuthLayout.module.scss';

export function AuthLayout() {
	return (
		<div className={cn(style.auth_layout_wrapper)}>
			<div className={cn(style.auth_layout)}>
				<div className={cn(style.text_wrapper)}>
					<h1>Let's find some image</h1>
				</div>
				<Outlet />
			</div>
		</div>
	);
}
