import { auth } from "@/auth";

const AuthSession = async ()=>{
    
    const user =await auth()
    console.log(user);
    return (
        <div>
            okk
        </div>
    )

}

export default AuthSession;