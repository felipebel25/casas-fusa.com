import { useMemo, useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { IProduct } from "@/interfaces"
import NextLink from "next/link";
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
            <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                <Link>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component={'img'}
                                className='fadeIn'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setisImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Card>
                </Link>
            </NextLink>
            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography component="h6" variant="h6" >{product.title}</Typography>
                <Typography  >{product.description}</Typography>
                <Typography fontWeight={500}>{`${product.price.toLocaleString("es-CO", { style: "currency", currency: "COP" })}`}</Typography>
            </Box>
        </Grid>
    )

}
