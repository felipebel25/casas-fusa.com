export interface IProduct {
    _id: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    rooms: number;
    bathrooms: number;
    ubication: string;

    slug: string;
    tags: string[];
    type: IType;

    highlight: boolean;

    createdAt: string;
    updatedAt: string;

}
export type IType = 'casa' | 'apartamento' | 'lote' | 'finca' | 'aparta-estudio';
