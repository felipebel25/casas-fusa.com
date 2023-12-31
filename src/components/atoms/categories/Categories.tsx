import { useRouter } from 'next/router'
import NextLink from "next/link"
import { DeckOutlined, DomainOutlined, HouseOutlined } from '@mui/icons-material'

import { Box, Button, Link } from '@mui/material'

import { styles } from './stylesCategories'

interface Props {
    mobileHidden?: boolean;
}

export const Categories = ({ mobileHidden = true }: Props) => {
    const { asPath } = useRouter()

    return (
        <Box
            component='nav'
            sx={{ ...styles.container, display: { xs: mobileHidden ? 'none' : 'flex', md: mobileHidden ? 'flex' : 'none' } }}
            className='fadeIn'
        >
            <NextLink href='/category/casas' passHref legacyBehavior>
                <Link>
                    <Button
                        startIcon={<HouseOutlined sx={styles.iconSubHome} />}
                        sx={asPath.includes('/casas') ? styles.buttonActive : styles.button}
                    >
                        Casas
                    </Button>
                </Link>
            </NextLink>
            <NextLink
                href='/category/apartamentos' passHref legacyBehavior>
                <Link>
                    <Button
                        startIcon={<DomainOutlined sx={styles.iconSubHome} />}
                        sx={asPath.includes('/apartamentos') ? styles.buttonActive : styles.button}
                    >
                        Apartamentos
                    </Button>
                </Link>
            </NextLink>
            <NextLink href='/category/quintas' passHref legacyBehavior>
                <Link>
                    <Button
                        startIcon={<DeckOutlined sx={styles.iconSubHome} />}
                        sx={asPath.includes('/quintas') ? styles.buttonActive : styles.button}
                    >
                        Quintas
                    </Button>
                </Link>
            </NextLink>
        </Box>
    )
}
