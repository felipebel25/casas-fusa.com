import { useContext } from "react"
import NextLink from "next/link"

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material"
import { UiContext } from "@/context"

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UiContext)


    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                    <Typography variant="h5">Casas |  </Typography>
                        <Typography sx={{ ml: 0.5 }} >Fusagasuga</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Button onClick={toggleSideMenu}  >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}
