import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import cn from 'classnames';
import styles from './FavoriteList.module.scss';
import { Album } from '../../../components/Album/Album';
import { useMemo } from 'react';
import { IPhoto } from '../../../helpers/photo.interface';

export function FavoriteList () {
	const {results} = useSelector(({photos}: RootState)=> photos);
	const jwt = useSelector(({user}: RootState)=> user.jwt);

	const photos = useMemo(()=>{
		if(results.length > 0){
			const res: IPhoto[] = results.map((el, index)=>{
				return {
					src: el.smallUrl,
					height: el.height,
					width: el.width,
					photoId: el.photoId,
					location: el.location,
					small: el.smallUrl,
					raw: el.rawUrl,
					username: el.username,
					full: el.fullUrl,
					index: index
				};
			});
			return res;
		}
	},[results]);

	
	return(
		<div className={cn(styles.body)}>
			{jwt ? photos ? <Album photos={photos}/> : 
				<div className={cn(styles.message)}><p>You haven't any photos</p></div> :
				<div className={cn(styles.message)}><p>You don't authorazed</p></div>}
		</div>
		
	);
}