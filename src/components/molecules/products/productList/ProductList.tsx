import { FC } from "react"
import { Grid } from "@mui/material"

import { IProduct } from "@/interfaces"
import { ProductCard } from "../productCard/ProductCard"
import { styles } from "./stylesProductList"

interface Props {
    products: IProduct[],
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container sx={styles.main} >
            {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
            ))}
        </Grid>
    )
}
