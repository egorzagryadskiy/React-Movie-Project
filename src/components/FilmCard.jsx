import ratingStar from './../assets/imgs/ratingStar.svg';
import { Link } from 'react-router-dom';

const FilmCard = ({ movie }) => {
    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/no-poster.jpg'

    return (
        <div className="filmCard-container">
            <Link href="/" className="filmcard__card" to={`/movie/${movie.id}`}>
                <img src={posterUrl} alt={movie.title} loading="lazy" className='filmcard__img'/>
                <div className="filmcard__title"><p>{movie.title} ({new Date(movie.release_date).getFullYear()})</p></div>
                <div className="filmcard__rate"><span><img src={ratingStar} alt="Rating" loading="lazy" width={24} height={10}/></span><p>{movie.vote_average.toFixed(1)}/10</p></div>
            </Link>
        </div>
    )
}

export default FilmCard