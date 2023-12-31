import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '@/interfaces';


const productSchema = new Schema({
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    images: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
    rooms: { type: Number, required: true, default: 0 },
    bathrooms: { type: Number, required: true, default: 0 },
    ubication: { type: String, required: true, default: "" },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    type: {
        type: String, enum: {
            values: ['casa', 'apartamento', 'lote', 'finca', 'aparta-estudio',],
            message: "This {VALUE} is not allows"
        },
        required: true,
        default: "casa"
    },
    highlight: { type: Boolean, default: false },
}, {
    timestamps: true
})

//todo: crear indice de mongo
productSchema.index({ title: 'text', tags: 'text' })

const Product: Model<IProduct> = mongoose.models?.Product || model('Product', productSchema);


export default Product;
