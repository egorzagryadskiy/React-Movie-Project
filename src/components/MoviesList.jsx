import { useState, useEffect } from "react"
import FilmCard from "./FilmCard"
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MoviesList = () => {
    const [genres, setGenres] = useState([])
    const [filtres, setFiltres] = useState({
        yearFrom: '',
        yearTo: '',
        genre: '',
        minRating: '',
    })

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru`)
                const data = await res.json()
                setGenres(data.genres || [])
            } catch (err) {
                console.error("Ошибка загрузки жанров", err)
            }
        }
        fetchGenres()
    }, [])

    const fetchMovies = async (filtres) => {
        setLoading(true)
        const {
            yearFrom,
            yearTo,
            genre,
            minRating
        } = filtres

        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ru&sort_by=popularity.desc`

        if (yearFrom) url += `&primary_release_date.gte=${yearFrom}-01-01`
        if (yearTo) url += `&primary_release_date.lte=${yearTo}-12-31`
        if (genre) url += `&with_genres=${genre}`
        if (minRating) url += `&vote_average.gte=${minRating}`

        try {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results || [])
        } catch (err) {
            console.error("Ошибка загрузки фильмов", err)
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(filtres)
    }, [])

    const handleFilterChange = (event) => {
        const {name, value} = event.target
        setFiltres((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleApplyFilters = (event) => {
        event.preventDefault()
        fetchMovies(filtres)
    }

    const nav = useNavigate()
    const goBackButton = () => {
        nav("/")
    }

    return (
        <div className="movieslist__container container">
            <div>
                <button className='filmpage__backbutton' type='button' onClick={goBackButton}>
                    Назад
                </button>
            </div>

            <div className="features__title">
                <h1>Фильмы</h1>
            </div>

            <div className="movieslist__filters-main">
                <div className="movieslist__filters-panel">
                    <form onSubmit={handleApplyFilters} className="movieslist__filters-container">
                        <div className="movieslist__filters-group">
                            <label>Год выпуска</label>
                            <div className="filters-group__year">
                                <input
                                type="number"
                                name="yearFrom"
                                placeholder="От"
                                value={filtres.yearFrom}
                                onChange={handleFilterChange}
                                min="1900"
                                max="2026"
                                />
                                <input
                                type="number"
                                name="yearTo"
                                placeholder="До"
                                value={filtres.yearTo}
                                onChange={handleFilterChange}
                                min="1900"
                                max="2026"
                                />
                            </div>
                        </div>

                        <div className="movieslist__filters-group">
                            <label>Жанр</label>
                            <select name="genre" value={filtres.genre} onChange={handleFilterChange}>
                                <option value="">Любой</option>
                                {genres.map((genr) => (
                                    <option key={genr.id} value={genr.id}>
                                        {genr.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="movieslist__filters-group">
                            <label>Рейтинг</label>
                            <input
                            type="number"
                            name="minRating"
                            placeholder="0-10"
                            value={filtres.minRating}
                            onChange={handleFilterChange}
                            min="0"
                            max="10"
                            step="0.1"
                            />
                        </div>

                        <button className="filmpage__backbutton" type="submit">
                            Найти
                        </button>
                    </form>
                </div>

                <div className="movieslist__films">
                    {loading ? (
                        <div className="loader container">Загрузка...</div>
                    ) : movies.length > 0 ? (
                        <div className="movieslist__films-grid">
                            {movies.map((movie) => (
                                <FilmCard key={movie.id} movie={movie}/>
                            ))}
                        </div>
                    ) : (
                       <div className="loader container">Фильмы не найдены</div> 
                    )}
                </div>
            </div>
        </div>
    )

}

export default MoviesList