import { Route, Routes } from "react-router-dom";
import Authenticationlayout from "@/layout/Authenticationlayout";
import Signin from "@/pages/authentication/Signin";
import Applayout from "@/layout/Applayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import { AuthCheck } from "@/common/auth/AuthCheck";
import Menu from "@/pages/sys/menu/Menu";
import Code from "@/pages/sys/code/App";

const App = () => {
    const baseUrl = import.meta.env.BASE_URL;

    return (
        <Routes>
            <Route path={baseUrl} element={<AuthCheck />}>
                <Route element={<Applayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="sys/menu" element={<Menu />} />
                    <Route path="sys/code" element={<Code />} />
                    {/* <Route path="sys/user" element={<User />} /> */}
                    {/* {Routingdata.map((idx) => (
                        <Route path={idx.path} element={idx.element} key={Math.random()} />
                        ))} */}
                </Route>
            </Route>
            <Route path={baseUrl} element={<Authenticationlayout />}>
                <Route path="login" element={<Signin />} />
            </Route>
        </Routes>
    );
};

export default App;
