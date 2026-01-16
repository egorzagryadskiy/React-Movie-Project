import logotype from './../assets/imgs/logo.svg'
import features from './../assets/imgs/features.svg'
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';

const Header = () => {
    const nav = useNavigate()
    const goToFeaturesButton = () => {
        nav("/features")
    }

    return (
        <div className='header'>
        <div className="header__container container">
            <div className='header__actions'>
                <a href="/" className='header__logo'>
                    <img src={logotype} alt="Logotype" width={400} height={100} loading="lazy" className='b'/>
                </a>
                <nav className='header__links'>
                    <a href="/" className='header__link-item'>Главная</a>
                    <Link to="/movies" className='header__link-item'>Фильмы</Link>
                </nav>
                <Search />
            </div>
            <div className='header__features'>
                <Link href='/features' className='header__features-button' to={"/features"}>
                    <img src={features} alt="Features" width={40} height={20} onClick={goToFeaturesButton}/>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default Header