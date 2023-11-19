import { Grid, Typography } from "@mui/material"
import { ShopLayout } from "../layouts/ShopLayout"
import { ProductList } from "@/components/molecules/products"
import { FullScreenLoading } from "@/components/atoms/FullScreenLoading"
import { useProducts } from "@/hooks/useProducts"


export const HomePage = () => {

    const { products, isLoading = true } = useProducts('/products')

    return (
        <ShopLayout
            imageFullUrl="https://i.ibb.co/Vt9V1rH/Captura-desde-2023-06-27-00-08-09.png"
            title={"Teslita - Home"}
            pageDescription={"Encuentra los mejores productos de teslita aqui"}
        >
            <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
            <Typography variant="h5" component='h5' sx={{ mb: 5 }}>Todos los productos</Typography>
            <Grid
                sx={{
                    width: '100%',
                    margin: "0 auto"
                }} container spacing={4}>
                {isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)}
            </Grid>
        </ShopLayout>
    )
}
