import { Banner } from "@/components/atoms/banner/Banner";
import { ProductList } from "@/components/molecules/products";
import { ShopLayout } from "@/components/organisms/layouts/ShopLayout";
import { useProducts } from "@/hooks/useProducts";

export default function WomenProductsPage() {

  const { products, isLoading } = useProducts('/products?type=apartamento')
  return (
    <ShopLayout
      title={"Apartamentos en Fusagasugá | CasasFusa.com"}
      pageDescription={"Explora nuestra selección de apartamentos en Fusagasugá en CasasFusa.com. Encuentra el espacio perfecto para tu vida urbana."}
      tags={["apartamentos", 'Fusagasugá', 'venta', 'propiedades', 'bienes raíces', 'vivienda', 'casasfusa', 'inversion', 'barato']}
    >
      <ProductList
        isLoading={isLoading}
        products={products}
      />
      <Banner
        title=" 🏢 Apartamentos en Fusagasugá: Eleva tu Estilo de Vida"
        description={`Descubre la comodidad y estilo de vida en nuestros seleccionados apartamentos en Fusagasugá.
            Encuentra tu hogar ideal y disfruta de la vida urbana en Fusagasugá. `}
      />
    </ShopLayout>
  )
}
