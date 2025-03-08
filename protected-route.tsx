"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Import as default
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // null indicates that the auth status is still being determined
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  // Define your protected routes
  const protectedRoutes = ["/watchlist"];
  const pathname = window.location.pathname;
  const isProtected = protectedRoutes.includes(pathname);

  useEffect(() => {
    const auth = async () => {
      // Get the access token from localStorage (client-side API)
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      try {
        // Decode the token
        const decoded = jwtDecode<{ exp: number }>(token);
        const tokenExpiry = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiry < now) {
          // Token expired; try to refresh it
          const refreshToken = localStorage.getItem("refresh_token");

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
              { refresh: refreshToken },
              { headers: { "Content-Type": "application/json" } }
            );
            const data = response.data;
            localStorage.setItem("access_token", data.access);
            setIsAuthorized(true);
          } catch (error) {
            console.error("Refresh token failed:", error);
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Decoding token failed:", error);
        setIsAuthorized(false);
      }
    };

    auth();
  }, []); // run only once on mount

  // While the auth check is in progress, show a loading indicator
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If the route is protected and the user isn't authorized, perform client-side redirect
  if (isProtected && !isAuthorized) {
    console.log('hiiiiiii')
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
