import React, { createContext, useContext, useEffect, useState} from "react";

export const FavoritesContext = createContext()


export const FavoritesProvider = ( {children} ) => {

    const[favorites, setFavorites] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            setFavorites(JSON.parse(saved))
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movieId) => {
        setFavorites((prev) => [...prev, movieId])
    }

    const removeFavorite = (movieId) => {
        setFavorites((prev) => prev.filter(id => id !== movieId))
    }

    const isFavorite = (movieId) => favorites.includes(movieId)

    return (
        <FavoritesContext.Provider value={ {favorites, addFavorite, removeFavorite, isFavorite} }>
            {children}
        </FavoritesContext.Provider>
    )
}
