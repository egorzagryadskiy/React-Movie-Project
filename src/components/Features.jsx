import { useNavigate } from "react-router-dom"
import ratingStar from './../assets/imgs/ratingStar.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";


const Features = () => {

    const useFavorites = () => {
        const context = useContext(FavoritesContext)
        return context
    }

    const nav = useNavigate()
    const goBackButton = () => {
        nav("/")
    }

    const { favorites } = useFavorites()
    const[favoritesMovies, setFavoritesMovies] = useState([])
    const[loading, setLoading] = useState(true)

   useEffect(() => {
     const fetchFavoriteMovies = async () => {
        if (favorites.length === 0) {
            setFavoritesMovies([])
            setLoading(false)
            return
        }

        try {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const BASE_URL = 'https://api.themoviedb.org/3';
            const promises = favorites.map(id => 
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU`)
                    .then(res => res.json())
            )

            const movies = await Promise.all(promises)
            setFavoritesMovies(movies)
        } catch (error) {
            console.error("Ошибка загрузки фильмов", error)
        } finally {
            setLoading(false)
        }
    }

    fetchFavoriteMovies()
   }, [favorites])

   if (loading) return <div className="loader container">Загрузка...</div>

    return (
        <div className="features__container container">
            <div>
                <button className='filmpage__backbutton' type='button' onClick={goBackButton}>
                    Назад
                </button>
            </div>
            <div>
                <div className="features__title">
                    <h1>Избранное</h1>
                </div>
                {favoritesMovies.length === 0 ? (
                    <div className="loader">Нет избранных фильмов</div>
                ) : (
                    <div className="filmCard-container features__list">
                        {favoritesMovies.map(movie => (
                            <Link href="/" className="filmcard__card feature__card" to={`/movie/${movie.id}`} key={movie.id}>
                                <img src={movie.poster_path  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.jpg'} alt={movie.title} loading="lazy" className='filmcard__img'/>
                                <div className="filmcard__title"><p>{movie.title} ({new Date(movie.release_date).getFullYear()})</p></div>
                                <div className="filmcard__rate"><span><img src={ratingStar} alt="Rating" loading="lazy" width={24} height={10}/></span><p>{movie.vote_average.toFixed(1)}/10</p></div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Features