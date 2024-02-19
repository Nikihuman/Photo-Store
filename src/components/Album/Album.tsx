import { AlbumProps } from './Album.props';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export function Album ({photos}: AlbumProps){
	const [index, setIndex] = useState(-1);
	return (
		<>
			<PhotoAlbum layout="columns"
				onClick={({index}) => {
					setIndex(index);
				}} 
				photos={photos}
				renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto,layoutOptions}) => {
					return(
						<PhotoCard
							photo={photo}
							style={wrapperStyle}
							onClick={(event)=>{
								if(layoutOptions.onClick){
									layoutOptions.onClick({event, photo, index: photo.index});
								}}}>
							{renderDefaultPhoto({ wrapped: true })}
						</PhotoCard>);}}
				columns={(containerWidth) => {
					if (containerWidth < 600) return 1;
					if (containerWidth < 720) return 2;
					if (containerWidth < 900) return 3;
					return 4;
				}}/>

			<Lightbox
				slides={photos.map(el=>({...el,
					src:el.full}))}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
			/>
		</>
	);
}