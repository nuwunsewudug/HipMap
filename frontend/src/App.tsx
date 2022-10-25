import Layout from "./components/layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import WelcomePage from "./pages/labeling/welcome";
import ProcessingPage from "./pages/labeling/processting";
import LoginWrapper from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="/welcome" element={<WelcomePage/>}></Route>
          <Route path="/processing" element={<ProcessingPage/>}></Route>
          <Route path="/login" element={<LoginWrapper />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
