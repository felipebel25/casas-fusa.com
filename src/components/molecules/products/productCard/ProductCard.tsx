import { useMemo, useState } from "react";
import NextLink from "next/link";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"

import { IProduct } from "@/interfaces"
import { priceToCop } from "utils/globalFunctions";

import { Bathtub, Bed } from "@mui/icons-material";

import { styles } from "./stylesProductCard";

interface Props {
    product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setisImageLoaded] = useState(false)

    const productImage = useMemo(() => {
        return isHovered
            ? `${product.images[1]}`
            : `${product.images[0]}`;

    }, [isHovered, product.images])

    return (
        <Grid
            item
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={styles.main}
        >
            <NextLink href={`/product/${product.slug}`} >
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component={'img'}
                            className='fadeIn'
                            image={productImage}
                            alt={product.title}
                            sx={styles.imageHouse}
                            onLoad={() => setisImageLoaded(true)}
                        />
                        <CardContent>
                            <Box sx={{ display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                                <Typography component="h6" variant="h6" fontWeight={600} sx={styles.title} >{product.title}</Typography>
                                <Typography fontWeight={600}>{`${priceToCop(product.price)}`}</Typography>
                                <Typography sx={styles.description} >{product.description.slice(0, 120)}...</Typography>
                                <Box sx={styles.textIcon}>
                                    <Bed sx={styles.icon} />
                                    <Typography paragraph>{product.rooms} Habitaciones</Typography>
                                </Box>
                                <Box sx={styles.textIcon}>
                                    <Bathtub sx={styles.icon} />
                                    <Typography paragraph>{product.bathrooms} Baños</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>

                </Card>
            </NextLink>
        </Grid>
    )

}
