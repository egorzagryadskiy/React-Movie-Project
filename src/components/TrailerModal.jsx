import { useState } from 'react'

const TrailerModal = ( {trailerKey} ) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            <button className='filmpage__backbutton trailer__button' onClick={openModal}>
                Смотреть трейлер
            </button>

            {isOpen && (
                <div className='modal__overlay' onClick={closeModal}>
                    <div className='modal__content' onClick={(event) => event.stopPropagation()}>
                        <button className='filmpage__backbutton' onClick={closeModal}>Закрыть</button>
                        <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                        frameborder="0"
                        title='Трейлер'
                        width="600"
                        height="300"
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        >

                        </iframe>
                    </div>
                </div>
            )}
        </>
    )
}

export default TrailerModal