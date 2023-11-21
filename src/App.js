import { ToastContainer } from "react-toastify";
import "./App.css";
import "./style.scss";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "./media-query.css";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("/login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        handleLogout={handleLogout}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user}/>}></Route>
        <Route path="/detail/:id" element={<Detail setActive={setActive}/>}></Route>
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />        
        
        <Route
          path="/update/:id"
          element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to="/" />
            )
          }
        />        <Route path="/about" element={<About></About>}></Route>
        <Route path="/auth" element={<Auth setActive={setActive} />}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
