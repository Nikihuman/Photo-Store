import { Photo } from 'react-photo-album';

export interface IPhoto extends Photo {
   small: string;
   raw: string;
   full: string;
   width: number;
   height: number;
   photoId: string;
   username: string;
   location: string;
   index: number;
}
