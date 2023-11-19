import { useContext, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"

import { ClearOutlined, SearchOutlined } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { UiContext } from "@/context"
import { styles } from "./stylesNavbar"

export const Navbar = () => {

    const { asPath, push } = useRouter()
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
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant="h5">Casas |  </Typography>
                        <Typography sx={{ ml: 0.5 }} >Fusagasuga</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Box className='fadeIn' sx={{ display: isSearch ? 'none' : { xs: 'none', sm: "block" } }}>
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button sx={{ m: "0.5rem" }} color={`${asPath.includes('/men') ? 'primary' : "info"}`} >
                                Casas
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button sx={{ m: "0.5rem" }} color={`${asPath.includes('/women') ? 'primary' : "info"}`} >
                                Apartamentos
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button sx={{ m: "0.5rem" }} color={`${asPath.includes('/kid') ? 'primary' : "info"}`} >
                                Fincas
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
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
                <IconButton
                    sx={{ display: { xs: 'flex', md: "none" } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <Button onClick={toggleSideMenu}  >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}
