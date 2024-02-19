import cn from 'classnames';
import style from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';
import { ErrorPageProps } from './ErrorPage.props';

export function ErrorPage ({message}: ErrorPageProps) {
	return(
		<div className={cn(style.error_page_wrapper)}>
			<div className={cn(style.error_page)}>
				<div className={cn(style.message)}>
					<h1>Error</h1>
					{message ? <span>{message}</span> :<span>Page not found</span>}
				</div>
				<Link to='/'>Back to main page</Link>
			</div>
		</div>
	);
}