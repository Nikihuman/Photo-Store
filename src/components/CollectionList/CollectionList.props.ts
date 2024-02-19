import { HTMLAttributes } from 'react';
// import { IPhoto } from '../../helpers/photo.interface';
import { ICollectionInfo } from '../CollectionCard/CollectionCard.props';
import { Photo } from 'react-photo-album';

export interface CollectionListProps extends HTMLAttributes<HTMLElement> {
	collectionData: ICollectionData[] 
}

export interface ICollectionData extends Photo {
	collectionInfo: ICollectionInfo
}
