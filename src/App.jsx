import { Routes, Route } from "react-router-dom";

import "./globals.css";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SigninForm />} />

        {/* Private Routes */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;