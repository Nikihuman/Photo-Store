import PhotoAlbum from 'react-photo-album';
import { CollectionCard } from '../CollectionCard/CollectionCard';
import { CollectionListProps } from './CollectionList.props';

export function CollectionList({ collectionData }: CollectionListProps) {
	return (
		<PhotoAlbum
			layout="columns"
			photos={collectionData}
			renderPhoto={({ photo, wrapperStyle, imageProps }) => (
				<CollectionCard collectionInfo={photo.collectionInfo} style={wrapperStyle}>
					<img
						style={{
							...imageProps.style,
							marginBottom: '0px'
						}}
						src={imageProps.src}
						alt={imageProps.alt}
					/>
				</CollectionCard>
			)}
			columns={containerWidth => {
				if (containerWidth < 500) return 2;
				if (containerWidth < 800) return 3;
				return 4;
			}}
		/>
	);
}
