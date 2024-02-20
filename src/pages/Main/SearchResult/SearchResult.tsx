import cn from 'classnames';
import styles from './SearchResult.module.scss';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { ISearchPhotos } from '../../../helpers/search-photos.interface';
import { ISearchCollections } from '../../../helpers/search-collection.interface';
import { ItemsGrid } from '../../../components/ItemsGrid/ItemsGrid';
import { useRef } from 'react';
import { Footer } from '../../../components/Footer/Footer';

export function SearchResult() {
	const { data, total } = useLoaderData() as {
      data: ISearchPhotos | ISearchCollections;
      total: string;
   };
	const { areaId, page } = useParams<{ areaId: string; page: string }>();
	const { pathname } = useLocation();
	const ref = useRef<HTMLDivElement>(null);

	setTimeout(() => {
		ref.current ? window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) : null;
	}, 500);

	return (
		<div ref={ref} className={cn(styles.body_wrapper)}>
			<div className={cn(styles.body)}>
				<ItemsGrid areaId={areaId ?? '1'} data={data} />
			</div>
			<Footer
				addition_to_the_route="page/"
				pathname={pathname}
				find_page_number_regexp={/page\/\d+/}
				total={total}
				page={page ?? '1'}
			/>
		</div>
	);
}
