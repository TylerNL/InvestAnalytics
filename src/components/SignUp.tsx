import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    
    
    return (
        <div>
            <form className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign Up Now!</h2>
                    <p>Already have an account? <Link to="/signin">Sign In!</Link></p>

                <div className="flex flex-col py-4">
                    <input placeholder="Email" className="p-3 mt-6" type="email"/>
                    <input placeholder="Password" className="p-3 mt-6" type="password"/>
                    <button type="submit" disabled={loading} className="p-3 mt-6 w-full disabled:opacity-50 bg-gray-700 hover:bg-gray-500 ">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;