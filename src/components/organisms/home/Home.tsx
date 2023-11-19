import { Box, Grid, Typography } from "@mui/material"
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
            <Box
                sx={{
                    backgroundColor: "#1fa3ab",
                    height: "8rem",

                    display: 'flex',
                    alignItems: "center",
                }}
            >
                <Box maxWidth="lg"
                    sx={{ width: "100%", margin: "0 auto", pl: "1rem" }}
                >
                    <Typography variant="h1" component='h1' sx={{ mb: 1, textShadow: "0px 0px 3px darkgrey" }} color="white">Casas en Fusagasuga y alrededores</Typography>
                    <Typography variant="h5" component='h5' sx={{ mb: 5 }} color="white">Todos los mejores inmuebles (Casas, Apartamentos , Fincas, Lotes y Aparta estudios)</Typography>
                </Box>
            </Box>
            <Grid
                sx={{
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    mt: "0"
                }} container >
                {isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)}
            </Grid>
        </ShopLayout>
    )
}
