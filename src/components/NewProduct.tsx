import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addProduct } from "../services/productsService";
import { successMsg } from "../services/feedbackService";

interface NewProductProps {

}

const NewProduct: FunctionComponent<NewProductProps> = () => {
    let navigate = useNavigate();
    useEffect(() => {
        formik.setFieldValue("price", "");
    }, []);
    let formik = useFormik({
        initialValues: { name: "", price: 0, category: "", description: "", image: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required().min(0),
            category: yup.string().required().min(2),
            description: yup.string().required().min(2),
            image: yup.string().required().min(2)
        }),
        onSubmit: (values) => {
            addProduct(values)
                .then((res) => {
                    navigate("/products")
                    successMsg("Product added successfully!")
                })
                .catch((err) => console.log(err));
        },
    })
    return (
        <>
            <form className="mb-3" onSubmit={formik.handleSubmit} >
                <h3 className="display-1">Add New Product</h3>
                <div className="form-floating mb-3">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="John Doe"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label htmlFor="name">Name</label>
                    {formik.touched.name && formik.errors.name && (<small className="text-danger">{formik.errors.name}</small>)}

                </div>
                <div className="form-floating mb-3">
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="100"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label htmlFor="floatingInput">price</label>
                    {formik.touched.price && formik.errors.price && (<small className="text-danger">{formik.errors.price}</small>)}
                </div>
                <div className="form-floating mb-3">
                    <input
                        name="category"
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="John Doe"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label htmlFor="category">category</label>
                    {formik.touched.category && formik.errors.category && (<small className="text-danger">{formik.errors.category}</small>)}
                </div>

                <div className="form-floating">
                    <input
                        name="description"
                        type="text" className="form-control" id="description" placeholder="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="description">Description</label>
                    {formik.touched.description && formik.errors.description && (<small className="text-danger">{formik.errors.description}</small>)}
                </div>

                <div className="form-floating my-3">
                    <input
                        name="image"
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder="John Doe"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    <label htmlFor="image">Image</label>
                    {formik.touched.image && formik.errors.image && (<small className="text-danger">{formik.errors.image}</small>)}

                </div>
                <button
                    type="submit"
                    className="btn btn-secondary w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}>Add</button>
            </form>
        </>
    )
}

export default NewProduct;