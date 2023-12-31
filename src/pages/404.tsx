import { Box, Typography } from "@mui/material"
const Custom404 = () => {
    return (
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', sm: "row" } }}>
                <Typography variant="h1" component='h1' fontSize={100} fontWeight={200} >404 |</Typography>
                <Typography marginLeft={2} fontSize={40} fontWeight={50}>No encontramos ninguna pagina aqui</Typography>
            </Box>
    )
}
export default Custom404