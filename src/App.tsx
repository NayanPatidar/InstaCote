import { Routes, Route } from "react-router-dom";

import "./global.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* {Public Routes} */}
        <Route path="/sign-in" element={<SigninForm />} />

        {/* {Private Routes} */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
