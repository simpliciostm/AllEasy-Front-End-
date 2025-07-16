import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes/route";
import AuthProvider from "./contexts/authProvider";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RouterApp />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;