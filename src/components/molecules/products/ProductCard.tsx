import { useMemo, useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { IProduct } from "@/interfaces"
import NextLink from "next/link";

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
            xs={5}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

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
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )

}
