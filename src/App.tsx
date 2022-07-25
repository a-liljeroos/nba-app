import "./App.scss";
import Nav from "./components/nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Site1 from "./components/site1/Site1";
//import Site2 from "./components/site2/Site2";
//import Site3 from "./components/site3/Site3";

function App() {
  const message: string =
    "the site is not tested with resolutions wider than 1920px";
  console.log(
    `%c${message}`,
    "color: #474747; background: #c9c9c9; font-size: 30px"
  );
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <main>
          <Routes>
            <Route path="/browser/*" element={<Site1 />} />
            <Route path="*" element={<Home />} />

            {/* additional site links */}
            {/*     <Route path="/site2" element={<Site2 />} />
            <Route path="/site3" element={<Site3 />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
