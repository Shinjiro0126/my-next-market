import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { jwtVerify } from "jose";

export default function useAuth(){
const [loginUserEmail, setLoginUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkToken = async() => {
      if(!token){
        router.push("/user/login");
      }

      try {
        const secretKey = new TextEncoder().encode("my-next-market");
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch {
        router.push("/user/login")
      }
    }
    checkToken();
  }, [router])

  return loginUserEmail;
}