import { IProduct } from '@/interfaces'
import { SHOP_CONSTANTS, db } from 'database'
import { Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        default:
            return res.status(400).json({
                message: "Bad request"
            })
    }
}


const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { type = 'all' } = req.query

    let condition = {}

    if (type !== 'all' && SHOP_CONSTANTS.validTypes.includes(`${type}`)) condition = { type }


    await db.connect()
    const products = await Product.find(condition).select('title description images price rooms  bathrooms  ubication tags type slug highlight -_id').lean()

    await db.disconnect()
   
    const updatedProducts = products.map(product => {
        product.images = product.images.map((image) => image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`)
        return product
    })


    return res.status(200).json(updatedProducts)

}
