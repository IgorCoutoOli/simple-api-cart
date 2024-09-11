import { find_product, find_cart, update_cart } from "../db/db.js"

async function cart_add(req, res) {
    try {
        const id = req.params.id;
        const qtd = parseInt(req.params.qtd)

        const product = await find_product(id);

        if(product === undefined) {
            return res.status(404).send("Não foi possivel encontrar o produto.");
        }

        const cart = await find_cart()
    
        cart.total = (cart.total+(qtd * product.price))
        cart.products.push({id, qtd})
    
        await update_cart(cart)

        return res.status(201).send(`${qtd}x do produto "${product.name}" adicionado ao carrinho.`);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

async function cart_del(req, res) {
    try {
        const id = req.params.id;
        const qtd = parseInt(req.params.qtd)

        const cart = await find_cart();
        const product = await find_product(id);

        if(product === undefined) {
            return res.status(404).send("Não foi possivel encontrar o produto.");
        }

        if (!Array.isArray(cart.products)) {
            return res.status(204).send("Carrinho esta vazio.");
        }

        const index = cart.products.findIndex(product => product.id === id);

        if (index !== -1) {
            cart.total = cart.total - (product.price * (cart.products[index].qtd - qtd));
            if(qtd === 0) {
                cart.products.splice(index, 1);
            } else {
                cart.products[index].qtd = qtd;
            }

            update_cart(cart);
        }
    
        return res.status(200).send(qtd > 0? `Quantidade do produto ${product.name} alterado para ${qtd}`:`Produto ${product.name} removido.`);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

async function cart_show(req, res) {
    const cart = await find_cart();

    const products = await Promise.all(
        cart.products.map(async (product) => {
            const base_product = await find_product(product.id);
    
            return {
                id: product.id,
                name: base_product.name,
                qtd: product.qtd,
                price: base_product.price,
                price_total: (base_product.price * product.qtd)
            };
        })
    );
    
    return res.status(200).json({
        products: {
            ...products
        },
        total: cart.total.toFixed(2)
    });
}

async function cart_clean(req, res) {
    const cart = await find_cart();

    cart.products = [];
    cart.total = 0;

    update_cart(cart);

    return res.status(200).send('Carrinho limpo.');
}

export { cart_add, cart_del, cart_show, cart_clean }