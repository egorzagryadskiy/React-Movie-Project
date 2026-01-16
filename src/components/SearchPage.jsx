import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import FilmCard from "./FilmCard"


const APi_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    const nav = useNavigate()
    const goBackButton = () => {
        nav("/")
    }
    const query = new URLSearchParams(location.search).get('q') || ''

    useEffect( () => {
        const fetchResults = async () => {
            if (!query) {
                setMovies([])
                setLoading(false)
                return
            }

            setLoading(true)

            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${APi_KEY}`)
                const data = await res.json()
                setMovies(data.results || [])
            } catch (err) {
                console.error("Ошибка загрузки результатов:", err)
                setMovies([])
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    if (loading) return <div className="loader container">Загрузка...</div>;

    return (
        <div className="features__container container">
            <div>
                <button className='filmpage__backbutton' type='button' onClick={goBackButton}>
                    Назад
                </button>
            </div>
            <div>
                <div className="features__title">
                    <h1>Результаты поиска</h1>
                </div>
                {movies.length === 0 ? (
                    <div className="loader">Фильмы не найдены</div>
                ) : (
                    <div className="searchpage__container">
                        {movies.map((movie) => (
                            <FilmCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage