import { Routes, HashRouter, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="server/:id" element={<Detail />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
