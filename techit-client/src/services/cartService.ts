import axios from "axios";
import Product from "../interfaces/Product";
import Cart from "../interfaces/Cart";
import _ from "lodash";

let api: string = `${process.env.REACT_APP_API}/carts`;

export function getCart() {
    return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function createCart(userId: number) {
    return axios.post(api, { userId, products: [], active: true })
}

export function addToCart(productToAdd: Product) {

    let product = _.pick(productToAdd, [
        "_id",
        "name",
        "category",
        "description",
        "price",
        "image",
    ]);
    return axios.post(api, product, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
                .token,
        },
    });
}

// add to cart / update cart
// export async function addToCart(userId: number, productToAdd: Product) {
//     try {

// 1. search for the exising cart products
// let res = await getCart();
// 2. add the new product to the products array
// res.data[0].products.push(productToAdd);
// 3. update the cart - put or patch
// return axios.patch(`${api}/${res.data[0].id}`, {
// products: res.data[0].products,
// });
//     } catch (error) {
//         console.log(error);
//     }
// }