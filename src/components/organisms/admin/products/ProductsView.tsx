import { useRouter } from 'next/router'
import Link from 'next/link'

import { Box, Button, CardMedia, Grid, Typography } from "@mui/material"
import { AddOutlined, DeleteOutline } from "@mui/icons-material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { removeHouse } from '@/services/products'

import { IProduct } from "@/interfaces"
import { priceToCop } from 'utils/globalFunctions'

import { styles } from './stylesProductsView'


interface Props {
    product: IProduct[] | undefined;
    error: any;
}

export const ProductsView = ({ product, error }: Props) => {
    const { reload } = useRouter()
    const data = product ?? [] as IProduct[];
    const columns: GridColDef[] = [
        {
            field: 'borrar',
            headerName: "Borrar",
            width: 40,
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <DeleteOutline
                        onClick={() => onDeleteHouse(row)}
                        style={{ width: "2.5rem", height: "2.5rem", color: "red", cursor: "pointer" }}
                    >
                    </DeleteOutline>
                )
            }
        },
        {
            field: 'img',
            headerName: "Foto",
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                        <CardMedia
                            alt={row.title}
                            component='img'
                            className='fadeIn'
                            image={row.img}
                        />
                    </a >
                )
            }
        },
        {
            field: 'price',
            headerName: "Precio",
            width: 200,
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <Typography>{priceToCop(row.price)}</Typography>
                )
            }
        },
        {
            field: 'title',
            headerName: "Title",
            width: 200,
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <Link href={`/admin/products/${row.slug}`} passHref>{row.title}</Link>
                )
            }
        },
        { field: 'type', headerName: "Tipo" },

    ]

    const onDeleteHouse = async (slug: any) => {
        const result = await removeHouse(slug)
        reload()
    }
    if (!data && !error) return (<></>);
    const rows = data!.map((product) => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        type: product.type,
        price: product.price,
        slug: product.slug
    }))
    return (
        <>
            <Box display='flex' justifyContent='flex-end' sx={{ mb: 2 }}>
                <Button
                    fullWidth
                    startIcon={<AddOutlined />}
                    color='secondary'
                    href='/admin/products/new'
                    size='large'
                    sx={styles.button}
                >
                    Crear Producto
                </Button>
            </Box>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </>
    )
}
