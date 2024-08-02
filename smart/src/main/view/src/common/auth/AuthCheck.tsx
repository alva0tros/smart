import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/sysStore";
import { api } from "@/common/api/instance";

const AuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const checkAuth = async () => {
            if (user) {
                try {
                    const response = await api.get("/auth/user", { withCredentials: true });
                    if (response.data) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [user, setUser]);

    if (isAuthenticated === null) {
        return null; // 또는 로딩 인디케이터를 반환.
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export { AuthCheck };
