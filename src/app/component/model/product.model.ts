import { Brand } from './brand.model';

export interface Product {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    saleDate: Date;
    image: string;
    description: string;
    brandEntity: Brand;
}