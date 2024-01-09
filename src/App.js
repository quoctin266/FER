import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Header/NavBar";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

function App() {
  const background = useSelector((state) => state.theme.background);

  return (
    <div className="App" style={{ backgroundColor: background }}>
      <NavBar />
      <Scrollbars
        style={{ height: "calc(100vh - 52.797px)" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <Outlet />
        <Footer />
      </Scrollbars>
    </div>
  );
}

export default App;
