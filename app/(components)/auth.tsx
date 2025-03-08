import { auth } from "@/auth";

const AuthSession = async ()=>{
    
    const user =await auth()
   
    return (
        <div>
            okk
        </div>
    )

}

export default AuthSession;