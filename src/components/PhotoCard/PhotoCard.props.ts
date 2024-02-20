import { HTMLAttributes, ReactNode } from 'react';
import { IPhoto } from '../../helpers/photo.interface';

export interface PhotoCardProps extends HTMLAttributes<HTMLDivElement> {
   photo: IPhoto;
   children: ReactNode;
}
