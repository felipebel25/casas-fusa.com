import useSWR from 'swr'
import { Box, Button, CardMedia, Grid } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { AdminLayout } from "@/components/organisms/layouts"

import { IProduct } from "@/interfaces"
import { AddOutlined, CategoryOutlined, DeleteOutline } from "@mui/icons-material"
import Link from 'next/link'
import { removeHouse } from '@/services/products'
import { useRouter } from 'next/router'


const ProductsPage = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products')
    const { reload } = useRouter()
    const columns: GridColDef[] = [
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
            field: 'title',
            headerName: "Title",
            width: 250,
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <Link href={`/admin/products/${row.slug}`} passHref>{row.title}</Link>
                )
            }

        },
        { field: 'type', headerName: "Tipo" },
        { field: 'price', headerName: "Precio" },
        {
            field: 'borrar',
            headerName: "Borrar",
            width: 250,
            renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
                return (
                    <DeleteOutline
                        onClick={() => onDeleteHouse(row)}
                        style={{ width: "2.5rem", height: "2.5rem", color: "red" }}
                    >
                    </DeleteOutline>
                )
            }

        },
    ]

    const onDeleteHouse = async (slug: any) => {
        const result = await removeHouse(slug)
        console.log(result);

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
        <AdminLayout
            title={`Products (${data?.length})`}
            subtitle={"Mantenimiento de Productos"}
            icon={<CategoryOutlined />}
        >
            <Box display='flex' justifyContent='flex-end' sx={{ mb: 2 }}>
                <Button
                    startIcon={<AddOutlined />}
                    color='secondary'
                    href='/admin/products/new'
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
        </AdminLayout>

    )
}

export default ProductsPage;