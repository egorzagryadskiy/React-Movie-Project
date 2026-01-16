import Body from "./Body"
import Header from "./Header"
import FilmPage from "./FilmPage"
import Features from "./Features"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SearchPage from "./SearchPage"
import MoviesList from "./MoviesList"


const MainApp = () => {

    return (
        <Router>
            <Header /> 
            <Routes>
                <Route path="/" element={<Body />}/>
                <Route path="/movie/:id" element={<FilmPage />}/>
                <Route path="/features" element={<Features />}/>
                <Route path="/search" element={<SearchPage />}/>
                <Route path="/movies" element={<MoviesList />}/>
            </Routes>
        </Router>
    )
}

export default MainApp