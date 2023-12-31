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
            images: ['https://res.cloudinary.com/dmftfxau8/image/upload/v1700371611/g1gsrytkb2nbbzvalvqs.jpg', 'https://res.cloudinary.com/dmftfxau8/image/upload/v1700371605/rbgbm92udrchxykbudcd.jpg'],
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
            images: ['https://res.cloudinary.com/dmftfxau8/image/upload/v1700371611/g1gsrytkb2nbbzvalvqs.jpg', 'https://res.cloudinary.com/dmftfxau8/image/upload/v1700371605/rbgbm92udrchxykbudcd.jpg'],
            price: 350000000,
            rooms: 3,
            bathrooms: 2,
            ubication: 'Fusagasuga',
            slug: "hermosa_casa_balmoral",
            tags: ['casa', 'barata'],
            type: "casa",
            highlight: true
        },
        {
            title: "Hermosa Casa Balmoral",
            description: "Hermosa hermosa hermosa casa",
            images: ['https://res.cloudinary.com/dmftfxau8/image/upload/v1700371605/rbgbm92udrchxykbudcd.jpg', 'https://res.cloudinary.com/dmftfxau8/image/upload/v1700371605/rbgbm92udrchxykbudcd.jpg'],
            price: 350000000,
            rooms: 3,
            bathrooms: 2,
            ubication: 'Fusagasuga',
            slug: "hermosa_casa_santanita",
            tags: ['casa', 'barata'],
            type: "casa",
            highlight: true
        },
    ],
    users: [
        {
            name: "Felipe Medina",
            email: "felipe@gmail.com",
            password: 'Pruebas12345.',
            role: "admin"
        },
        {
            name: "Pacho Medina",
            email: "pacho@gmail.com",
            password: 'Pruebas12345.',
            role: "client"
        },
    ],

}