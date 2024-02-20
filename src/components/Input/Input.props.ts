import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   id: string;
   lable?: string;
   error_message?: string;
   error_text_position?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
   };
}
