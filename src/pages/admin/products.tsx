import { ProductsView } from '@/components/organisms/admin/products/ProductsView';
import { AdminLayout } from '@/components/organisms/layouts/AdminLayout';
import { IProduct } from '@/interfaces';
import { CategoryOutlined } from '@mui/icons-material';
import useSWR from 'swr'

const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products')

    return (
        <AdminLayout
            title={`Admin Inmuebles`}
            subtitle={"Mantenimiento de Casas"}
            icon={<CategoryOutlined />}
        >
            <ProductsView
                product={data}
                error={error}
            />
        </AdminLayout>

    )
}

export default ProductsPage;