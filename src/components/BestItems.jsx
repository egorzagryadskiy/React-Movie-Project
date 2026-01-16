import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FilmCard from './../components/FilmCard'
import axios from 'axios'
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const APi_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const NewItems = (props) => {

    const [movies2, setMoviesBest] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
                    params: {
                        api_key: APi_KEY,
                        language: 'ru-RU',
                        page: 1
                    }
                })
                setMoviesBest(response.data.results)
            }
            catch (error) {
                console.error("Ошибка загрузки фильмов:", error)
            }
        }

        fetchMovies()
    }, [])

    
    return (
        <div className="newitems__container container">
            <div className="newitems__title"><h1>{props.name}</h1></div>
            <div className="newitems__main">
                <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                width={1000}
                >
                        {movies2.map(movie => (
                            <SwiperSlide>
                                <FilmCard key={movie.id} movie={movie}/>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}

export default NewItems