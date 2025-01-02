import { useRef, useState } from 'react'
import Style from './card-select-color.module.css'

export function CardSelectColor({ colors, chooseColor }) {
  const [colorSelected, setColorSelected] = useState()
  const modalRef = useRef()

  const toggleModal = () => {
    if (modalRef.current) {
      if (modalRef.current.open) {
        modalRef.current.close()
      } else {
        modalRef.current.showModal()
      }
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
            {colors.map(([name, hex]) => (
              <div key={hex}>
                <div
                  className={Style.colorOption}
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
              Cancelar
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
