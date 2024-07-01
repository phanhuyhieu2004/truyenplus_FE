import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Story from "./components/story/Story";
import Chap from "./components/chap/Chap";
import Create from "./components/create/Create";
import List from "./components/list/List";
import ListChap from "./components/list/ListChap";
import CreateChap from "./components/create/CreateChap";
import Edit from "./components/edit/Edit";
import EditChap from "./components/edit/EditChap";

function App() {

  return (
    <div className="App"
    >

      <Router>
        <Routes>

          <Route
              path="/home"
              element={
                <>
                  <Header/>
                  <Home/>
                  <Footer/>
                </>
              }
          /> <Route
              path="/list"
              element={
                <>
                  <Header/>
                  <List/>
                  <Footer/>
                </>
              }
          />  <Route
            path="/chapters/:storyId"
              element={
                <>
                  <Header/>
                  <ListChap/>
                  <Footer/>
                </>
              }
          />  <Route
            path="/chapter/:storyId/:chapterId"
              element={
                <>
                  <Header/>
                  <Chap/>
                  <Footer/>
                </>
              }
          />  <Route
              path="/create"
              element={
                <>
                  <Header/>
                  <Create/>
                  <Footer/>
                </>
              }
          /> <Route
            path="/create/:storyId"
              element={
                <>
                  <Header/>
                  <CreateChap/>
                  <Footer/>
                </>
              }
          /><Route
            path="/edit/:id"
              element={
                <>
                  <Header/>
                  <Edit/>
                  <Footer/>
                </>
              }
          /><Route
            path="/editChapter/:storyId/:chapterId"
              element={
                <>
                  <Header/>
                  <EditChap/>
                  <Footer/>
                </>
              }
          />
            <Route
              path="/story/:storyId"
              element={
                <>
                  <Header/>
                  <Story/>
                  <Footer/>
                </>
              }
          /> <Route
              path="/chap"
              element={
                <>
                  <Header/>
                  <Chap/>
                  <Footer/>
                </>
              }
          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
