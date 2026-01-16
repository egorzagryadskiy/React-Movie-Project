import NewItems from "./NewItems"
import BestItems from "./BestItems"
import PopularItems from "./PopularItems"

const Body = () => {
    return (
        <div className="body__container">
            <NewItems name="Новинки"/>
            <BestItems name="Лучшее"/>
            <PopularItems name="Популярное"/>
        </div>
    )
}

export default Body