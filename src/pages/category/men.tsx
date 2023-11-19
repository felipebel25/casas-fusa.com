import { ShopLayout } from "@/components/organisms/layouts";
import { ProductList } from "@/components/molecules/products/ProductList";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";
import { Grid, Typography } from "@mui/material";

export default function WomenProductsPage() {

    const { products, isLoading } = useProducts('/products?gender=men')


    return (
        <>
            <ShopLayout title={"Teslita - Men Section"} pageDescription={"Encuentra los mejores productos de teslita para hombres,chicos aqui"} >
                <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
                <Typography variant="h5" component='h5' sx={{ mb: 5 }}>Todos los productos</Typography>
                <Grid sx={{
                    width: '100%',
                    margin: "0 auto"
                }} container spacing={4}>
                    {isLoading
                        ?
                        <FullScreenLoading />
                        :

                        <ProductList
                            products={products}
                        />
                    }
                </Grid>
            </ShopLayout>
        </>
    )
}
