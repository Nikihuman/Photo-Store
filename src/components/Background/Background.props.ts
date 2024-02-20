import { HTMLAttributes, ReactNode } from 'react';

export interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   imageUrl?: string;
}
