import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Header/NavBar";
import { Scrollbars } from "react-custom-scrollbars-2";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Scrollbars
        style={{ height: "91vh" }}
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
