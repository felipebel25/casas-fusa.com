import { GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"

import { ProductSlideShow } from "@/components/molecules/products"
import { IProduct } from "@/interfaces"
import { Box, Grid, Typography } from "@mui/material"
import { getAllProductSlugs, getProductBySlug } from "database/dbProducts"
import { ShopLayout } from "@/components/organisms/layouts/ShopLayout"


interface Props {
  product: IProduct;
}


const ProductPage = ({ product }: Props) => {

  const { push } = useRouter()

  return (
    <ShopLayout
      imageFullUrl={product.images[0]}
      title={product.title}
      pageDescription={product.description}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow
            images={product.images}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* -----------------Titulos----------------------*/}
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>{`$${product.price}`}</Typography>
            {/* -----------------Cantidad-------------------- */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad </Typography>

            </Box>

            {/* -------Descripcion----------- */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
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
// // You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// * ssr
// import { GetServerSideProps } from 'next'
// import { getProductBySlug } from "database"

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {

//   const slug = query.slug || ''

//   const product = await getProductBySlug(slug)
//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product

//     }
//   }
// }
// * getStaticPaths
// * revalidar cada 24 horas
// * blocking


export default ProductPage