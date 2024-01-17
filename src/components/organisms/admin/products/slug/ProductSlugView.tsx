import { ProductSlideShow } from "@/components/molecules/products"
import { IProduct } from "@/interfaces";
import { Box, Button, Chip, Divider, Typography } from "@mui/material"
import { styles } from "./stylesProductSlugView";
import { priceToCop } from "utils/globalFunctions";
import { Bathtub, Bed, Phone, WhatsApp } from "@mui/icons-material";

interface Props {
  product: IProduct;
}

export const ProductSlugView = ({ product }: Props) => {
  return (
    <Box
      component="section"
      sx={styles.main}
    >
      <Box
        component="aside"
        sx={styles.sideImages}>
        <ProductSlideShow
          images={product.images}
        />
      </Box>
      <Box
        sx={styles.sideText}
        component="article"
      >
        {/* -----------------Titulos----------------------*/}
        <Typography
          variant="h1"
          component='h1'
          sx={styles.title}
        >{product.title}</Typography>
        <Typography
          variant="subtitle1"
          component='h2'
          sx={styles.price}
        >{`${priceToCop(product.price)}`}</Typography>
        {/* ----------------Ubication--------------- */}
        <Typography
          sx={{ color: "#333333", fontSize: "1.55rem" }}
        >{product.ubication}</Typography>
        <Button
          sx={styles.buttonContactWhatsApp}
          startIcon={<WhatsApp sx={styles.iconButton} />}
          variant="outlined"
          target="__blank"
          href={`https://api.whatsapp.com/send?phone=573134084382&text=Hola%20Me%20gustaria%20contactarme%20para%20obtener%20mas%20informacion%20por%20el%20siguiente%20inmueble%20${product.title}%20${product.price}`}
        >
          WhatsApp
        </Button>
        <Button
          sx={styles.buttonContactPhone}
          startIcon={<Phone sx={styles.iconButton} />}
          variant="contained"
          target="__blank"
          href={`tel:3134084382`}
        >
          3134084382
        </Button>

        <Divider sx={{ width: "100%", m: "1rem auto" }} />
        {/* ----------------Rooms----------------------- */}
        <Box sx={styles.textIcon}>
          <Bed sx={styles.icon} />
          <Typography paragraph sx={styles.textRoom}>{product.rooms} Habitaciones</Typography>
        </Box>
        <Box sx={styles.textIcon}>
          <Bathtub sx={styles.icon} />
          <Typography paragraph sx={styles.textRoom}>{product.bathrooms} Baños</Typography>
        </Box>
        <Divider sx={{ width: "100%", m: "1rem auto" }} />

        {/* -------Descripcion----------- */}
        <Box >
          <Typography
            variant="body2"
            sx={styles.description}
          >{product.description}</Typography>
        </Box>
      </Box>
    </Box >
  )
}
