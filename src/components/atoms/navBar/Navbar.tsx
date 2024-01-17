import { useContext, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"

import { AccountCircleOutlined, ClearOutlined, SearchOutlined } from "@mui/icons-material"
import { AppBar, Box, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { UiContext } from "@/context"
import { CasasIcon } from "../icon/CasasIcon"
import { Categories } from "../categories/Categories"

import { styles } from "./stylesNavbar"

export const Navbar = () => {

    const { push } = useRouter()
    const { toggleSideMenu } = useContext(UiContext)

    const [isSearch, setIsSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`)
    }
    return (
        <AppBar sx={styles.main}>
            <Toolbar sx={styles.container}>
                <CasasIcon sx={styles.icon} />
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography sx={{ fontFamily: "Raleway", color: "#0B4665", fontWeight: "600" }} variant="h5">Casasfusa.com</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Categories />
                <Box flex={1} />
                {/* screens bigs */}
                {isSearch ? (
                    <Input
                        className="fadeIn"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        placeholder="Buscar..."
                        onKeyPress={(e) => e.key === "Enter" ? onSearchTerm() : ""}
                        sx={{ display: { xs: 'none', sm: "flex" } }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsSearch(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />)
                    :
                    (<IconButton
                        className="fadeIn"
                        sx={{ display: { xs: 'none', md: "flex" } }}
                        onClick={() => setIsSearch(true)}
                    >
                        <SearchOutlined />
                    </IconButton>)
                }
                {/* screens shorts */}
                {/* <IconButton
                    sx={{ display: { xs: 'none', md: "none" } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton> */}
                <IconButton onClick={toggleSideMenu}>
                    <AccountCircleOutlined />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
