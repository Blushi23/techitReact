import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkUser, getTokenDetails } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";

interface LoginProps {
    setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    navigate("/home");
                    successMsg(`You are logged in as ${values.email}`);
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
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                })
                .catch((err) => console.log(err));
        },

    })
    return (
        <>
            <div className="container col-md-3">
                <form className="mb-3" onSubmit={formik.handleSubmit} >
                    <h3 className="display-1">LOGIN</h3>
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
                        disabled={!formik.isValid || !formik.dirty}>Submit</button>
                </form>
                <Link to="/register">Click to register</Link>
            </div>
        </>
    )
}

export default Login;