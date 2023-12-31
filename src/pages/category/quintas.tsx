
import { Banner } from "@/components/atoms/banner/Banner";
import { ProductList } from "@/components/molecules/products";
import { ShopLayout } from "@/components/organisms/layouts/ShopLayout";
import { useProducts } from "@/hooks/useProducts";

export default function QuintasPage() {

    const { products, isLoading } = useProducts('/products?type=quinta')
    return (
        <ShopLayout
            title={"Quintas en Fusagasugá | CasasFusa.com"}
            pageDescription={"Explora nuestras quintas en Fusagasugá en CasasFusa.com. Vive en armonía con la naturaleza en propiedades exclusivas."}
            tags={["quintas", 'Fusagasugá', 'venta', 'propiedades', 'bienes raíces', "vivienda", "casasfusa"]}
        >

            <ProductList isLoading={isLoading} products={products} />
            <Banner
                title="🏡 Quintas cerca de Fusagasugá: Vive la Tranquilidad en un Entorno Exclusivo"
                description={`Experimenta la serenidad y el encanto rural con nuestras exclusivas quintas en Fusagasugá. 
                Rodeadas de belleza natural, estas propiedades ofrecen un escape único y un estilo de vida tranquilo. 
                ¡Encuentra tu quinta perfecta!
                `}
            />
        </ShopLayout>
    )
}
