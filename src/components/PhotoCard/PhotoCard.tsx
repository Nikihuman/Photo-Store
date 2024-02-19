import cn from 'classnames';
import styles from './PhotoCard.module.scss';
import { PhotoCardProps } from './PhotoCard.props';
import HeartIcon from '../../assets/heart.svg?react';
import { Button } from '../Button/Button';
import { RootState, useAppDispatch } from '../../store/store';
import { photosActions } from '../../store/photos.slice';
import { useSelector } from 'react-redux';
import { MouseEvent, useMemo } from 'react';


export function PhotoCard ({className, photo, children, ...props}: PhotoCardProps) {
	const dispatch = useAppDispatch();
	const results = useSelector(({photos}: RootState)=> photos.results);
	const jwt = useSelector(({user}: RootState)=> user.jwt);
	const isExistingPhoto = useMemo(() => {
		return results.find(({photoId})=>photoId === photo.photoId) ?? null;
	}, [photo.photoId, results]);
	// const [isExistingPhotoStata, setIsExistingPhotoStata] = useState<boolean>(isExistingPhoto());


	

	const photoController = (event: MouseEvent) => {
		event.stopPropagation();
		if(isExistingPhoto){
			dispatch(photosActions.removePhoto({id: isExistingPhoto.id}));
			return;
		}
		dispatch(photosActions.savePhoto({
			username: photo.username,
			photoId: photo.photoId,
			location: photo.location ?? 'BELARUS',
			rawUrl: photo.raw,
			smallUrl: photo.small,
			fullUrl: photo.full,
			height: photo.height,
			width: photo.width
		}));
	};
	

	return(
		<div  className={cn(className, styles.image_card_wrapper)} {...props}>
			{children}
			<div className={cn(styles.tools)}>
				{jwt ? <Button className={cn(styles.button,
					styles.hidden_elemen,
					styles.like_it,
					{[styles['exists']]: isExistingPhoto})}
				onClick={photoController}>
					<HeartIcon/>
				</Button> : jwt}
				<div className={cn(styles.information, styles.hidden_elemen)}>
					<span>Author: {photo.username}</span>
					<span>From: {photo.location}</span>
				</div>
			</div>
		</div>
	);
}