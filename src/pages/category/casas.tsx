
import { Banner } from "@/components/atoms/banner/Banner";
import { ProductList } from "@/components/molecules/products";
import { ShopLayout } from "@/components/organisms/layouts/ShopLayout";
import { useProducts } from "@/hooks/useProducts";

export default function CasasPage() {

    const { products, isLoading } = useProducts('/products?type=casa')

    return (
        <ShopLayout
            title={"Casas en Fusagasugá | CasasFusa.com"}
            pageDescription={"Explora nuestra selección de casas en Fusagasugá en CasasFusa.com. Encuentra la vivienda perfecta que se adapte a tu estilo de vida."}
            tags={["casas", 'Fusagasugá', 'venta', 'propiedades', 'bienes raíces', 'vivienda', 'casasfusa']}
        >
            <ProductList
                isLoading={isLoading}
                products={products}
            />
            <Banner
                title="🏠 Casas en Fusagasugá: Encuentra tu Espacio Perfecto"
                description="Descubre tu próximo hogar en Fusagasugá. Tenemos las mejores casas en venta, desde acogedoras residencias hasta modernas viviendas. Encuentra la perfecta para ti y tu familia. ¡Contáctanos ahora para comenzar tu nueva vida en Fusagasugá!"
            />
        </ShopLayout>
    )
}
