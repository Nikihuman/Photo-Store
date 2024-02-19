// import cn from 'classnames';
// import styles from './ItemsGrid.module.scss';
import { ItemsGridProps } from './ItemsGrid.props';
import { IResultOfSearchPhoto } from '../../helpers/search-photos.interface';
import { IResultOfSearchCollection } from '../../helpers/search-collection.interface';
import { Album } from '../Album/Album';
import { CollectionList } from '../CollectionList/CollectionList';
import { ICollectionData } from '../CollectionList/CollectionList.props';


export function ItemsGrid ({ data, areaId = '1'}: ItemsGridProps) {
	if(areaId === '1'){
		const photo = data.results as IResultOfSearchPhoto[];
		const photos = photo.map((el, index)=>{
			return {
				src: el.urls.small,
				height: el.height,
				width: el.width,
				photoId: el.id,
				location: el.user.location,
				small: el.urls.small,
				raw: el.urls.raw,
				username: el.user.username,
				full: el.urls.full,
				index: index
			};
		});
		return (
			<Album photos={photos} />
		);
	}
	const photo = data.results as IResultOfSearchCollection[];
	const photos: ICollectionData[] = photo.map(({cover_photo, ...el})=>{
		return {
			collectionInfo: {
				collectionId: el.id,
				collectionTitle: el.title,
				collectionUsername: el.user.username,
				totalPhotos: el.total_photos
			},
			height: cover_photo.height,
			width: cover_photo.width,
			src: cover_photo.urls.small
		};});
	return (
		<CollectionList collectionData={photos}/>
	);
}