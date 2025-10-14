import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import GOOGL from '../assets/google_logo.png';
import { supabase } from "../context/supabaseClient";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [usingGoogle, setUsingGoogle] = useState(false);

    const {session, signInUser} = UserAuth() || {};

    if(session){
        return(
            <Navigate to="/watchlist"/>
        )
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if(usingGoogle){
                await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${window.location.origin}/watchlist`,
                    },
                });
            }else{
                const result = await signInUser(email, password);
                if(result.success) {
                    navigate('/watchlist');
                }else if(!usingGoogle) {
                    setError(result.error || "Sign in failed");
                }
            }
        } catch(err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign in</h2>
                    <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>

                <div className="flex flex-col py-4">
                    <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-3 mt-6" type="email"/>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-3 mt-6" type="password"/>
                    <button type="submit" disabled={loading} className="p-3 mt-6 w-full disabled:opacity-50 bg-gray-700 hover:bg-gray-500 ">Sign In</button>
                    <div className="mt-6 flex items-center gap-3 text-gray-400">
                        <span className="flex-1 h-px bg-gray-600" />
                        <span className="text-sm">Other sign up options</span>
                        <span className="flex-1 h-px bg-gray-600" />
                    </div>
                    <button className="h-12 w-12 bg-white flex items-center justify-center self-center mt-4" onClick={() => setUsingGoogle(true)}>
                        <img src={GOOGL} alt="Google Logo" className="h-8 w-8"/>
                    </button>
                    {error && <p className="text-red-600 p-6">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default SignIn;