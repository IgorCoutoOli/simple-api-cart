import { find_whitelist, update_whitelist, find_product } from "../db/db.js";

async function whitelist_add(req, res) {
    try {
        const id = req.params.id;

        const product = await find_product(id);

        if(product === undefined) {
            return res.status(404).send("Não foi possivel encontrar o produto.");
        }

        const whitelist = await find_whitelist();

        if(whitelist.products.includes(id)) {
            return res.status(409).send("O produto já esta na sua whitelist.");
        }

        whitelist.products.push(id);
        
        await update_whitelist(whitelist);

        return res.status(201).send(`O produto "${product.name}" foi adicionado a sua whitelist.`);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

async function whitelist_del(req, res) {
    try {
        const id = req.params.id;

        const whitelist = await find_whitelist();

        if (!Array.isArray(whitelist.products)) {
            return res.status(404).send("Whitelist esta vazia.");
        }

        const index = whitelist.products.findIndex(productId => productId === id);

        if(index === -1) {
            return res.status(404).send("Produto não esta na sua whitelist.");
        }

        whitelist.products.splice(index, 1);

        update_whitelist(whitelist);
    
        return res.status(200).send(`Produto removido da whitelist.`);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

async function whitelist_show(req, res) {
    const whitelist = await find_whitelist();

    const products = await Promise.all(
        whitelist.products.map(async (id) => {
            const product = await find_product(id);
    
            return {
                id,
                name: product.name,
                price: product.price,
            };
        })
    );
    
    return res.status(200).json({
        products: {
            ...products
        },
    });
}

export { whitelist_add, whitelist_del, whitelist_show };