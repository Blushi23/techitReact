import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbackService";
import { addToCart } from "../services/cartService";


interface ProductsProps {
    userInfo: any;
}

const Products: FunctionComponent<ProductsProps> = ({ userInfo }) => {
    let [products, setProducts] = useState<Product[]>([]);
    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }, [productsChanged]);

    let render = () => {
        setProductsChanged(!productsChanged)
    }
    let handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    render();
                    successMsg("Product deleted successfully!");
                })
                .catch((err) => console.log(err));
        }
    };
    // let handleAddToCart = (product: Product) => {
    //     let userId = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
    //     addToCart(product)
    //         .then((res) => successMsg("Product added to cart!"))
    //         .catch((err) => console.log(err)
    //         )
    // }
    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => successMsg("Product added to cart!"))
            .catch((err) => console.log(err));
    };
    return (
        <>
            <h1>Products</h1>
            {userInfo.isAdmin && (<Link to="new" className="btn btn-success">Add product</Link>)}
            {products.length ? (
                <div className="container">
                    <div className="row">
                        {products.map((product: Product) => (
                            <div
                                key={product._id}
                                className="card col-md-4 mx-2 my-2"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    style={{ width: "16.5rem", height: "16.5rem" }}
                                    alt={product.name}
                                />
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {product.category}
                                    </h6>
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text text-success">{product.price} ₪</p>
                                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                    {userInfo.isAdmin && (
                                        <>
                                            <Link to={`update/${product._id}`} className="btn btn-warning mx-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <Link to="" className="btn btn-danger" onClick={() => handleDelete(product._id as string)}>
                                                <i className="fa-solid fa-trash" ></i>
                                            </Link>
                                        </>
                                    )}


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No products</p>
            )}
        </>
    )
}

export default Products;