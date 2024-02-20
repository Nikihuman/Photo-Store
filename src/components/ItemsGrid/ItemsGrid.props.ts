import { HTMLAttributes } from 'react';
import { ISearchCollections } from '../../helpers/search-collection.interface';
import { ISearchPhotos } from '../../helpers/search-photos.interface';

export interface ItemsGridProps extends HTMLAttributes<HTMLDivElement> {
   data: ISearchPhotos | ISearchCollections;
   areaId?: string;
}
