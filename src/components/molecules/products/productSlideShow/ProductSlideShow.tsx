import { Box } from "@mui/material"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

import { styles } from './stylesProductSlideShow'
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
                    <Box key={image}>
                        <Box
                            sx={{
                                ...styles.slide,
                                backgroundImage: `url(${image})`,
                            }}
                        />
                    </Box>
                )
            })}

        </Slide>
    )
}
