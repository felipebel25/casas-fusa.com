import { ShopLayout } from "../layouts/ShopLayout"
import { ProductList } from "@/components/molecules/products"
import { useProducts } from "@/hooks/useProducts"
import { Banner } from "@/components/atoms/banner/Banner"
import { generalMetaTags } from "utils/constants"


export const HomePage = () => {

    const { products, isLoading = true } = useProducts('/products')

    return (
        <ShopLayout
            title={"Inmuebles en Venta en Fusagasugá | casasfusa.com"}
            pageDescription={"Explora nuestra selección de inmuebles en venta en Fusagasugá. Encuentra tu hogar perfecto con nosotros."}
            tags={generalMetaTags}
        >
            <ProductList isLoading={isLoading} products={products} />
            <Banner
                title="🏡 Tu hogar en Fusagasuga o alrededores"
                description={`Explora nuestra selección de inmuebles en venta en Fusagasugá. 
                (Casas, Apartamentos , Fincas, Lotes y Aparta estudios)`}
            />
        </ShopLayout>
    )
}
