import { GetServerSideProps, NextPage } from 'next'

import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { getSession } from 'next-auth/react'
import { dbOrders } from 'database'
import { IOrder } from '@/interfaces'

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order
    console.log(order);

    return (
        <ShopLayout title='Resumen de la orden' pageDescription="Resumen de la orden">
            <Typography variant="h1" component='h1'>Orden: {order._id}</Typography>
            {order.isPaid ? (
                <Chip
                    sx={{ my: 2 }}
                    label='Orden ya fue Pagada'
                    variant="outlined"
                    color='success'
                    icon={<CreditScoreOutlined />}
                />
            ) : (
                <Chip
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
                    variant="outlined"
                    color='error'
                    icon={<CreditCardOffOutlined />}
                />
            )}
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="subtitle1">Direccion de la entrega</Typography>
                            </Box>
                            <Typography >{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography >{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography >{shippingAddress.city} {shippingAddress.zip}</Typography>
                            <Typography >{shippingAddress.country}</Typography>
                            <Typography >{shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <OrderSummary orderValues={{
                                numberOfItems: order.numberOfItems,
                                subtotal: order.subtotal,
                                tax: order.tax,
                                total: order.total,
                            }}
                            />
                            <Box sx={{ mt: 2 }} display={'flex'} flexDirection='column'>
                                {/* todo */}

                                {order.isPaid ? (
                                    <Chip
                                        sx={{ my: 2 }}
                                        label='Orden ya fue Pagada'
                                        variant="outlined"
                                        color='success'
                                        icon={<CreditScoreOutlined />}
                                    />
                                ) : (
                                    <h1>Pagar</h1>

                                )}

                                {/* <h1>Pagar</h1> */}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query
    const session: any = await getSession({ req })
    
    if (!session) {
        console.log('no autorizado Order id');

        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }
    // si el usuario que hizo la orden no es igual al usuario actual de la seccion
    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}