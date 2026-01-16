import ratingStar from './../assets/imgs/ratingStar.svg';
import { useEffect, useState, context, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import TrailerModal from './TrailerModal';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null)


  const nav = useNavigate()
  const goBackButton = () => {
    nav("/")
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        const movieRes = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU`
        );
        const movieData = await movieRes.json();


        if (movieRes.ok) {
          setMovie(movieData);
        } else {
          throw new Error(movieData.status_message || 'Ошибка загрузки фильма');
        }



        const videosRes = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ru`)
        const videosData = await videosRes.json()

        const trailer = videosData.results?.find(
          (video) =>
            video.type === 'Trailer' &&
            video.site === 'YouTube' &&
            video.key
        )

        if (trailer) {
          setTrailerKey(trailer.key)
        }

        const creditsRes = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const creditsData = await creditsRes.json();

        if (creditsRes.ok) {
          setCast(creditsData.cast.slice(0, 10));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <div className="loader container">Загрузка...</div>;
  if (error) return <div className="loader container">Ошибка: {error}</div>;
  if (!movie) return <div className="loader container">Фильм не найден</div>;

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const toggleFavorite = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }
  }

  return (
    <div className="filmpage__container container">
      <div>
        <button className='filmpage__backbutton' type='button' onClick={goBackButton}>
            Назад
        </button>
      </div>
      <div className="filmpage__main">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/no-poster.png'
          }
          alt={movie.title}
          className='filmpage__poster'
        />
        <div className='filmpage__info'>
          <h1 className='filmpage__info-title'>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
          <div className="filmcard__info-rate"><span><img src={ratingStar} alt="Rating" loading="lazy" width={24} height={10}/></span><p>{movie.vote_average.toFixed(1)}/10</p></div>
          <h2 className='filmpage__info-text'>Описание</h2>
          <p className='filmpage__info-description'>{movie.overview || 'Нет описания.'}</p>
          <button className='filmpage__toFeatures' onClick={toggleFavorite}>{isFavorite(movie.id) ? "Удалить из избранного" : "Добавить в избранное"}</button>
          {trailerKey ? ( <TrailerModal trailerKey={trailerKey}/>) : <div className="loader container">Трейлер недоступен</div>}
        </div>
      </div>

      <h2 className="filmpage__actors-title">Актёры</h2>
      <div className="filmpage__actors-list">
        {cast.map((actor) => (
          <div key={actor.id} className="actor__card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : '/no-avatar.png'
              }
              alt={actor.name}
              className='actor__poster'
            />
            <p className='actor__name'>{actor.name}</p>
            <p className='actor__character'>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}