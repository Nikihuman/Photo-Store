import { HTMLAttributes } from 'react';
import { IPhoto } from '../../helpers/photo.interface';

export interface AlbumProps extends HTMLAttributes<HTMLElement> {
   photos: IPhoto[];
}
