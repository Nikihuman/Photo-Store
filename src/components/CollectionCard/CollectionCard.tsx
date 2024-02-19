import cn from 'classnames';
import styles from './CollectionCard.module.scss';
import { CollectionCardProps } from './CollectionCard.props';
import { Link } from 'react-router-dom';

export function CollectionCard ({className, collectionInfo,children, ...props}: CollectionCardProps) {
	return(
		<Link to={`/collectionId/${collectionInfo.collectionId}/page/1`} className={cn(className, styles.collection_card_wrapper)} {...props}>
			{children}
			<div className={cn(styles.title)}>{collectionInfo.collectionTitle}</div>
			<div className={cn(styles.name_and_count)}>
				<div>{collectionInfo.totalPhotos} photos</div>
				<div>Curated by: {collectionInfo.collectionUsername}</div>
			</div>
			<div className={cn(styles.hover)}/>
		</Link>
	);
}