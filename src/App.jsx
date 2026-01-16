import MainApp from "./components/MainApp"
import Loader from "./components/Loader"
import { useState, useEffect } from "react"
import { FavoritesProvider } from "./context/FavoritesContext"

function App() {
  const[loading, setLoading] = useState(true)
  
  useEffect(() => {
      setTimeout(() => {
          setLoading(false);
      }, 600)
  }, [])
  
  return (
    <>
      <FavoritesProvider>
        {loading && <Loader />}
        {!loading && <MainApp />}
      </FavoritesProvider>
    </>
  )
}

export default App