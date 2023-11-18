import { db } from 'database';
import { Order, Product, User } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;

    numberOfClients: number;

    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventory: number;
}
    | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getInformation(req, res)

        default:
            return res.status(400).json({ message: "Bad Request" })
    }

    // number of orders
}

const getInformation = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()

    const [
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        Order.find({ isPaid: false }).count(),
        User.find({ role: 'client' }).count(),

        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count(),

    ])
    await db.disconnect()

    return res.status(200).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    });

}