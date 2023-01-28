import { useEffect } from "react";
import Header from "./Header";
import TodoBody from "./TodoBody";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils";

const Main = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!getToken) {
            navigate("/login");
        }
    }, []);

    return (
        <section data-testid='todo-main'>
            <Header />
            <TodoBody />
        </section>
    );
};

export default Main;
