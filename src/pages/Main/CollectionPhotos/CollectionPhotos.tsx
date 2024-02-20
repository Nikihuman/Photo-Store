import cn from 'classnames';
import styles from './CollectionPhotos.module.scss';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { Footer } from '../../../components/Footer/Footer';
import { ICollectionPhotos } from '../../../helpers/get-collection-photos.interface';
import { Album } from '../../../components/Album/Album';

export function CollectionPhotos() {
	const { data, total } = useLoaderData() as { data: ICollectionPhotos[]; total: string };
	const { page } = useParams<{ page: string }>();
	const { pathname } = useLocation();
	const ref = useRef<HTMLDivElement>(null);
	const photos = useMemo(() => {
		return data.map((el, index) => {
			return {
				src: el.urls.small,
				height: el.height,
				width: el.width,
				photoId: el.id,
				location: el.user.location,
				small: el.urls.small,
				raw: el.urls.raw,
				username: el.user.username,
				full: el.urls.full,
				index: index
			};
		});
	}, [data]);

	setTimeout(() => {
		ref.current ? window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) : null;
	}, 500);

	return (
		<div ref={ref} className={cn(styles.body_wrapper)}>
			<div className={cn(styles.body)}>
				<Album photos={photos} />
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
