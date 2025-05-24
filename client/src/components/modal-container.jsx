import { Link } from 'react-router'

export function ModalContainer({ children }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  )
}