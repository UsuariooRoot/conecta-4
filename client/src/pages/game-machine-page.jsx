import { Link } from "react-router";
import { ModalContainer } from "../components/modal-container";

export function GameMachinePage() {
  return (
    <ModalContainer>
      <h2>Elige un nivel de dificultad</h2>
      <div style={{ maxWidth: '180px', margin: '0 auto' }}>
        <Link to='/machine?difficulty=easy' className='btn-primary'>Fácil</Link>
        <Link to='/machine?difficulty=medium' className='btn-primary'>Medio</Link>
        <Link to='/machine?difficulty=hard' className='btn-primary'>Difícil</Link>
        <Link to='/' className="btn-primary">Regresar</Link>
      </div>
    </ModalContainer>
  )
}