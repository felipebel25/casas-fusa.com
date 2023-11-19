import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideshow.module.css'
interface Props {
    images: string[]
}
export const ProductSlideShow = ({ images }: Props) => {
    return (
        <Slide
            easing="ease"
            duration={7000}
            indicators
        >
            {images.map((image) => {
                return (
                    <div className={styles['each-slide']} key={image}>
                        <div
                            // todo: crear un responsive para esta parta si esta en desktop que use contain si no cover
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        >

                        </div>
                    </div>
                )
            })}

        </Slide>
    )
}
