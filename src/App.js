import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Create from "./pages/Create";
import UserPost from "./pages/UserPost";

//https://github.com/trickjsprogram/toolkit-crud-api

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserPost />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
