import { GetStaticProps, GetStaticPropsContext } from "next"

import { IProduct } from "@/interfaces"
import { getAllProductSlugs, getProductBySlug } from "database/dbProducts"
import { ShopLayout } from "@/components/organisms/layouts/ShopLayout"
import { ProductSlugView } from "@/components/organisms/admin/products/slug/ProductSlugView"


interface Props {
  product: IProduct;
}


const ProductPage = ({ product }: Props) => {
  return (
    <ShopLayout
    title={`${product.title} | casasfusa.com`}
    pageDescription={product.description}
      tags={product.tags}
      imageFullUrl={product.images[0]}
    >
      <ProductSlugView
        product={product}
      />
    </ShopLayout >
  )
}

export const getStaticPaths: any = async (ctx: any) => {
  const slugs = await getAllProductSlugs()

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {

  const { slug } = ctx.params as { slug: string };
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    },
    // per 24 hours
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage