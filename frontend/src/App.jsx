import { Routes, Route } from "react-router-dom";

import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { SendMoney } from "./components/SendMoney";
import { Dashboard } from "./components/Dashboard";

function App() {
  const token = localStorage.getItem("auth-token");

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/" element={token ? <Dashboard /> : <Signin />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Signin />} />
      </Routes>
    </div>
  );
}

export default App;
