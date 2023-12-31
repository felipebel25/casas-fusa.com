import { FC } from "react"
import { Box, Grid } from "@mui/material"

import { IProduct } from "@/interfaces"
import { ProductCard } from "../productCard/ProductCard"
import { Categories } from "@/components/atoms/categories/Categories"
import { FullScreenLoading } from "@/components/atoms/FullScreenLoading"

import { styles } from "./stylesProductList"

interface Props {
    products: IProduct[],
    isLoading: boolean
}

export const ProductList: FC<Props> = ({ products, isLoading }) => {
    return (
        <Grid container sx={styles.main} component='main'>
            <Categories mobileHidden={false} />
            {isLoading
                ?
                <FullScreenLoading />
                :
                <Box sx={styles.container} component='section'>
                    {products.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                    ))}
                </Box>
            }
        </Grid>
    )
}
