import { FunctionComponent, useEffect, useState } from "react";
import { getUseDetails } from "../services/usersService";
import User from "../interfaces/User";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    let [userInfo, setUserInfo] = useState<User>()
    useEffect(() => {
        getUseDetails()
            .then((res) => {
                setUserInfo(res.data)
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="container mt-5 ">
                <div className="card mb-3 shadow" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src="/images/user.avif"
                                className="img-fluid rounded-start"
                                alt="User"
                            />
                        </div>
                        <div className="col-md-8  text-start">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span>User's name: </span> {userInfo?.name}
                                </h5>
                                <p className="card-text">
                                    <span className="fw-bold">Email Address: </span>
                                    {userInfo?.email}
                                </p>
                                <div className="card-text">
                                    <small className="text-body-secondary">
                                        <span className="fw-bold">User type: </span>
                                        {userInfo?.isAdmin ? (
                                            <p>Admin user</p>
                                        ) : (
                                            <p>Regular user</p>
                                        )}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile;