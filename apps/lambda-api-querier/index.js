import fetch from 'node-fetch';
import {createItem} from "./dynamo.js";
import dotenv from 'dotenv';

dotenv.config();

// You can change the category to anything you want
const CATEGORY = 'spreads'; // try 'snacks', 'breakfast-cereals', etc.
const PAGE_SIZE = 50; // Limit to avoid huge payloads
const API_URL = `https://world.openfoodfacts.org/category/${CATEGORY}.json?fields=product_name,brands,ingredients_text,nutriments,image_url,categories&page_size=${PAGE_SIZE}`;

/**
 * Transforms an Open Food Facts product into a simplified Algolia-ready object
 */
function transformProduct(product, index = 0) {
    if (!product.product_name) return null;

    return {
        id: `${product.brands || 'unknown'}-${index}`,
        name: product.product_name,
        brand: product.brands,
        categories: product.categories?.split(',').map((c) => c.trim()),
        ingredients: product.ingredients_text,
        image: product.image_url,
        nutrients: {
            energy_kcal: product.nutriments?.['energy-kcal_100g'],
            fat: product.nutriments?.['fat_100g'],
            sugar: product.nutriments?.['sugars_100g'],
            salt: product.nutriments?.['salt_100g'],
        },
    };
}

export async function handler(event) {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.products || !data.products.length) {
        console.warn('No products found in response.');
        return { statusCode: 204 };
    }

    const records = data.products
        .map((product, idx) => transformProduct(product, idx))
        .filter(Boolean); // remove nulls

    await Promise.all(records.map(record => createItem(record)));

    console.log(`Fetched ${records.length} products.`);
    console.dir(records.slice(0, 3), { depth: null }); // show preview

    return {
        statusCode: 200,
        body: JSON.stringify({ count: records.length }),
    };
}

// Local runner
if (process.env.LOCAL) {
    handler().catch(console.error);
}
