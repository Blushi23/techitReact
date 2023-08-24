import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getCart } from "../services/cartService";

interface CartProps {

}

const Cart: FunctionComponent<CartProps> = () => {
    let [productsInCart, setProductsInCart] = useState<Product[]>([])
    useEffect(() => {
        let userId: number = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
        getCart()
            .then((res) => setProductsInCart(res.data))
            .catch((err) => console.log(err))

    }, []);
    return (
        <>
            <h3 className="display-3">Cart</h3>
            {productsInCart.length ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsInCart.map((product: Product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products in cart</p>
            )}
        </>
    )
}

export default Cart;