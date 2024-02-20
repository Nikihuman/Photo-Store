export type Nullable<T> = null | T;

export interface IPasswordVisibility {
   type: 'password' | 'text';
}

export interface ISearchErrors {
   query?: string;
}
