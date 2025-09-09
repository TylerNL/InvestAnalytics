import { createContext, useEffect, useState, useContext} from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext({
  session: undefined,
  signUpNewUser: () => {},
  signOutUser: () => {},
  signInUser: () => {},
});

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if(error){
            console.error("Problem signing up: ", error);
            return {success: false, error};
        }

        return {success: true, data};
    }

    const signInUser = async (email, password) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.error("Error occured" , error);
                return {success: false, error: error.message};
            }
            console.log("login success.");
            return {success: true, data};
        }catch(error){
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }}) => {
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const signOutUser = () => {
        const {error} = supabase.auth.signOut();
        if(error){
            console.error("Error: ", error);
        }
    }

    return (
        <AuthContext.Provider value = {{session, signUpNewUser, signOutUser, signInUser}}>
            {children}
        </AuthContext.Provider> 
    )
}

export const UserAuth = () =>{
    return useContext(AuthContext);
}
