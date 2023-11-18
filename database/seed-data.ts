import { IType } from '@/interfaces';
import bcrypt from 'bcryptjs'

interface SeedProduct {
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

}

interface SeedUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'client';
}




interface SeedData {
    products: SeedProduct[],
    users: SeedUser[],
}


export const initialData: SeedData = {
    products: [
        {
            title: "Hermosa Casa",
            description: "Hermosa hermosa hermosa casa",
            images: ['', ''],
            price: 250000000,
            rooms: 5,
            bathrooms: 2,
            ubication: 'Fusagasuga',
            slug: "hermosa_casa",
            tags: ['casa', 'barata'],
            type: "casa",
            highlight: false
        },
        {
            title: "Hermosa Casa Balmoral",
            description: "Hermosa hermosa hermosa casa",
            images: ['', ''],
            price: 350000000,
            rooms: 3,
            bathrooms: 2,
            ubication: 'Fusagasuga',
            slug: "hermosa_casa_balmoral",
            tags: ['casa', 'barata'],
            type: "casa",
            highlight: true
        },

    ],
    users: [
        {
            name: "Felipe Medina",
            email: "felipe@gmail.com",
            password: bcrypt.hashSync("Pruebas12345."),
            role: "admin"
        },
        {
            name: "Pacho Medina",
            email: "pacho@gmail.com",
            password: bcrypt.hashSync("Pruebas12345."),
            role: "client"
        },
    ],

}