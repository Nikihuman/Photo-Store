import { FooterProps } from './Footer.props';
import cn from 'classnames';
import styles from './Footer.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import TriangleIcon from '../../assets/triangle-right.svg?react';

export function Footer({ className, pathname, ...props }: FooterProps) {
	const [pageState, setPageState] = useState<number>(Number(props.page) || 1);

	const changePage = useCallback(
		(options: 'increase' | 'decrease') => {
			if (options === 'increase' && pageState < Number(props.total)) {
				return setPageState(state => ++state);
			}
			return pageState > 1 ? setPageState(state => --state) : undefined;
		},
		[props.total, pageState]
	);

	useEffect(() => {
		setPageState(Number(props.page));
	}, [props.page]);

	return (
		<footer className={cn(className, styles.footer)} {...props}>
			{pageState <= 1 ? null : (
				<Link
					to={`${pathname.slice(0, pathname.search(props.find_page_number_regexp))}${props.addition_to_the_route}${pageState - 1}`}
				>
					<Button
						onClick={() => {
							changePage('decrease');
						}}
					>
						<TriangleIcon className={cn(styles.triangle_icon_left, styles.icon)} />
					</Button>
				</Link>
			)}
			<span>{pageState}</span>
			<Link
				to={`${pathname.slice(0, pathname.search(props.find_page_number_regexp))}${props.addition_to_the_route}${pageState + 1}`}
			>
				<Button
					onClick={() => {
						changePage('increase');
					}}
				>
					<TriangleIcon className={cn(styles.icon)} />
				</Button>
			</Link>
		</footer>
	);
}
