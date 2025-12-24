import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUpPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { updateUser } = useContext(UserContext);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Full name cannot be empty!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address!");
            return;
        }

        if (!password) {
            setError("Please enter a password!");
            return;
        }

        if (!confirmPassword) {
            setError("Please confirm your password!");
            return;
        }

        if (confirmPassword !== password) {
            setError("Passwords do not match!");
            return;
        }

        setError("");

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Sign up failed, please try again.");
            } else {
                setError("An unexpected error occurred, please try again later.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center mt-10 md:mt-0">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="John"
                            type="text"
                        />
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="********"
                            type="password"
                        />
                        <Input
                            value={confirmPassword}
                            onChange={({ target }) => setConfirmPassword(target.value)}
                            label="Confirm Password"
                            placeholder="********"
                            type="password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5 font-medium">{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3 text-center">
                        Already have an account? {""}
                        <Link className="text-primary font-medium underline" to='/login'>
                            Log In
                        </Link>
                    </p>
                </form>
            </div >
        </AuthLayout >
    );
}

export default SignUpPage;