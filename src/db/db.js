import product from './products.json' assert { type: "json" }
import fs from 'fs/promises'

const cart_dir = './src/db/cart.json'
const whitelist_dir = './src/db/whitelist.json'

async function find_product(id) {
    return product[id];
}

async function find_cart() {
    return JSON.parse(await fs.readFile(cart_dir, 'utf8'));
}

async function update_cart(cart) {
    fs.writeFile(cart_dir, JSON.stringify(cart, null, 2))
}

async function find_whitelist() {
    return JSON.parse(await fs.readFile(whitelist_dir, 'utf8'));
}

async function update_whitelist(whitlist) {
    fs.writeFile(whitelist_dir, JSON.stringify(whitlist, null, 2))
}

export { find_product, update_cart, find_cart, find_whitelist, update_whitelist }