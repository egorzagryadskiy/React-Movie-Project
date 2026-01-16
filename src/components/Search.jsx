import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const APi_KEY = import.meta.env.VITE_TMDB_API_KEY;


const Search = () => {

    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()
    
    const fetchSearchResults = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSuggestions([])
            return
        }

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&api_key=${APi_KEY}`
            )
            const data = await res.json()
            setSuggestions(data.results.slice(0, 7))
        } catch (err) {
            console.error('Ошибка поиска:', err)
            setSuggestions([])
        }
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchSearchResults(query)
        }, 300)

        return () => clearTimeout(timerId)
    }, [query])

    const handleInputChange = (event) => {
        const value = event.target.value
        setQuery(value)
        setShowDropdown(value.length > 0)
    }

    const handleSuggestionClick = (movieId) => {
        setQuery('')
        setShowDropdown(false)
        navigate(`/movie/${movieId}`)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`)
            setQuery('')
            setShowDropdown(false)
        }
    }




    return (
        <div>
            <form action="/" className='header__search-form' onSubmit={handleSearchSubmit}>
                <input
                name='searchQuery'
                type="text"
                placeholder='Поиск фильмов...'
                className='header__form-input'
                value={query}
                onChange={handleInputChange}
                onFocus={() => query && setShowDropdown(true)}
                />
                <button type='submit' className='header__form-button'><div className='form__text'><p>Найти</p></div></button>
            </form>

            {showDropdown && suggestions.length > 0 && (
                <div className="search__dropdown">
                    {suggestions.map((movie) => (
                        <div
                        key={movie.id}
                        onClick={() => handleSuggestionClick(movie.id)}
                        className="search__suggestions"
                        >
                            {movie.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search