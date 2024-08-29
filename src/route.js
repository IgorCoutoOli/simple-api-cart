import { Router } from "express";
import { cart_add, cart_del, cart_show, cart_clean } from "./service/cart.js";
import { whitelist_add, whitelist_del, whitelist_show } from "./service/whitelist.js";

const router = Router()

// Cart
router.get('/cart-add/:id/:qtd', cart_add)
router.get('/cart-del/:id/:qtd', cart_del)
router.get('/cart-show', cart_show)
router.get('/cart-clean', cart_clean)

// Whitelist
router.get('/whitelist-add/:id', whitelist_add)
router.get('/whitelist-del/:id', whitelist_del)
router.get('/whitelist-show', whitelist_show)

export default router