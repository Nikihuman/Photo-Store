import { SearchBarProps } from './SearchBar.props';
import cn from 'classnames';
import styles from './SearchBar.module.scss';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import LoupeIcon from '../../assets/loupe.svg?react';
import TriangleIcon from '../../assets/triangle-up.svg?react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISearchErrors } from '../../helpers/other';
import { useDispatch, useSelector } from 'react-redux';
import { floatingActions } from '../../store/floating-element.slice';
import { RootState } from '../../store/store';


export function SearchBar ({className, ...props}: SearchBarProps) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchErrors, setSearchErrors] = useState<ISearchErrors>({query: undefined});
	const searchBarState = useSelector(({floating}: RootState) => floating.searchBar);

	const submitSearchForm = (e: FormEvent<HTMLFormElement>):void => {
		e.preventDefault();
		setSearchErrors({query: undefined});
		const {query, radio} = e.target as typeof e.target & {query: {value: string}, radio: {value: string}};
		if(!query.value || query.value.trim() == ''){
			setSearchErrors({query: 'You must write keywords to search'});
			return;
		}
		navigate(`/search/${query.value}/area/${radio.value}/page/1`);
	};
	
	return(
		<div className={cn(className, styles.search_wrapper,
			{[styles['closed']]: !searchBarState})}
		{...props}>
			<form onSubmit={submitSearchForm} className={cn(styles.form)}>
				<div className={cn(styles.input_wrapper)}>
					<Input className={cn(styles.input)}
						type='text'
						id='search'
						name='query'
						placeholder='Search...'
						error_message={searchErrors.query}
						error_text_position={{top: '3.5em'}}/>
					<Button className={cn(styles.button_submit)}>
						<LoupeIcon className={cn(styles.icon)} title='search'/>
					</Button>
				</div>
				<div className={cn(styles.radio_wrapper)}>
					<span>Search in:</span>
					<div>
						<label htmlFor="collection">Collections</label>
						<input name='radio' type='radio' id='collection' value='2' />
					</div>
					<div>
						<label htmlFor="photos">Photos</label>
						<input name='radio' type='radio' id='photos' value='1' defaultChecked/>
					</div>
				</div>
			</form>
			<Button
				className={cn(styles.button_controller)}
				onClick={()=>{
					dispatch(floatingActions.searchBarController());}}>
				<TriangleIcon className={cn({[styles['triangle_icon_up']]: searchBarState})}/>
				Search
			</Button>
		</div>
	);
}