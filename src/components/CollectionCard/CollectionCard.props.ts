import { HTMLAttributes } from 'react';

export interface CollectionCardProps extends HTMLAttributes<HTMLElement> {
   collectionInfo: ICollectionInfo;
}

export interface ICollectionInfo {
   collectionTitle: string;
   collectionId: number;
   totalPhotos: number;
   collectionUsername: string;
}
