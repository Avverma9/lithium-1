import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header.jsx';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Footer from './components/Footer/Footer.jsx';
import Admin from './components/Admin/Admin.jsx';
import User from './components/User/User.jsx';


function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/User" element={<User/>}></Route>
                <Route path="/" element={<Footer />}>
                  
                </Route>
            </Routes>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
