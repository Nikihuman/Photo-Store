import { BackgroundProps } from './Background.props';
import cn from 'classnames';
import styles from './Background.module.scss';


export function Background ({className, children, ...props}: BackgroundProps) {
	return(
		<div className={cn(className, styles.background)}  {...props}>
			{children}
		</div>
	);
}
// style={{backgroundImage: `url(${imageUrl})`}}