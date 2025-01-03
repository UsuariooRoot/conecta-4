import { useEffect, useRef, useState } from 'react'
import Style from './card-select-color.module.css'

export function CardSelectColor({ colors, currentColor, chooseColor }) {
  const [colorSelected, setColorSelected] = useState()
  const [idxCurrentColor, setIdxCurrentColor] = useState()
  const modalRef = useRef()

  useEffect(() => {
    if (!colors || !currentColor) return
    const idx = colors.findIndex((color) => color[1] === currentColor[1])
    if (idx >= 0) setIdxCurrentColor(idx)
  }, [colors, currentColor])

  const toggleModal = () => {
    if (!modalRef.current) return
    if (modalRef.current.open) {
      modalRef.current.close()
    } else {
      modalRef.current.showModal()
    }
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className={`${Style.button} ${Style.secondaryButton}`}
      >
        Cambiar color
      </button>

      <dialog ref={modalRef} className={Style.modal}>
        <div className={Style.cardSelectColor}>
          <h2>Elige un color</h2>
          <div className={Style.containerColors}>
            {colors.map(([name, hex, unavailable], i) => (
              <div key={hex}>
                <div
                  className={`
                    ${Style.colorOption}
                    ${i === idxCurrentColor && Style.currentColor}
                    ${i !== idxCurrentColor && unavailable && Style.unavailableColor}
                  `}
                  style={{ backgroundColor: hex }}
                  onClick={() => setColorSelected({ name, hex })}
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className={Style.actions}>
            <button
              onClick={toggleModal}
              className={`${Style.button} ${Style.secondaryButton}`}
            >
              Salir
            </button>
            <button
              onClick={() => console.log('Cambiar a:', colorSelected)}
              className={`${Style.button} ${Style.primaryButton}`}
            >
              Confirmar
            </button>
          </div>
        </div>

      </dialog>
    </div>
  )
}
