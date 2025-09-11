import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    const {session, signInUser} = UserAuth() || {};

    if(session){
        return(
            <Navigate to="/watchlist"/>
        )
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInUser(email, password);
            if(result.success) {
                navigate('/watchlist');
            }else{
                setError(result.error || "Sign in failed");
            }
        }catch(err){
            setError("Error: ", err.message);
        }finally{
            setLoading(false);
        }
    }

    
    return (
        <div>
            <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign in</h2>
                    <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>

                <div className="flex flex-col py-4">
                    <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-3 mt-6" type="email"/>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-3 mt-6" type="password"/>
                    <button type="submit" disabled={loading} className="p-3 mt-6 w-full disabled:opacity-50 bg-gray-700 hover:bg-gray-500 ">Sign In</button>
                    {error && <p className="text-red-600 p-6">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default SignIn;