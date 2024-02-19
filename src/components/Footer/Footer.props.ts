import { HTMLAttributes} from 'react';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	// children: ReactNode,
	total:string;
	pathname: string,
	find_page_number_regexp: RegExp,
	page:string,
	addition_to_the_route: string
}