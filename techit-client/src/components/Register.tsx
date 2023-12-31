import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersService";
import { successMsg } from "../services/feedbackService";
import { createCart } from "../services/cartService";

interface RegisterProps {
    setUserInfo: Function;

}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit(values) {
            addUser({ ...values, isAdmin: false })
                .then((res) => {
                    navigate("/home");
                    sessionStorage.setItem(
                        "token",
                        JSON.stringify({
                            token: res.data,
                        }))
                    sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify({
                            email: (getTokenDetails() as any).email,
                            isAdmin: (getTokenDetails() as any).isAdmin,
                            userId: (getTokenDetails() as any)._id,
                        })
                    );
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    successMsg(`${values.email} wes registered and logged in`);
                    // createCart(res.data.id)
                })
                .catch((err) => console.log(err));
        },
    })
    return (
        <>
            <div className="container col-md-3">
                <form className="mb-3" onSubmit={formik.handleSubmit} >
                    <h3 className="display-1">REGISTER</h3>
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
                            name="email"
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />

                        <label htmlFor="floatingInput">Email Adress</label>
                        {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}

                    </div>
                    <div className="form-floating">
                        <input
                            name="password"
                            type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && (<small className="text-danger">{formik.errors.password}</small>)}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-secondary w-100 my-3"
                        disabled={!formik.isValid || !formik.dirty}>Register</button>
                </form>
                <Link to="/">Already have user? Login here</Link>
            </div>        </>
    )
}

export default Register;

