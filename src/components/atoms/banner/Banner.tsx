import { Box, Typography } from '@mui/material'
import { styles } from './stylesBanner'

interface Props {
    title: string;
    description: string;
}


export const Banner = ({ title = '', description = '' }: Props) => {
    return (
        <Box sx={styles.main}>
            <Box
                maxWidth="lg"
                sx={styles.container}
            >
                <Typography
                    variant="h1"
                    component='h1'
                    sx={styles.title}
                >{title}</Typography>
                <Typography
                    variant="h5"
                    component='h5'
                    sx={styles.description}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    )
}
