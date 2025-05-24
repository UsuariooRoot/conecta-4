import Style from './floating-message.module.css'

export function FloatingMessage({ message, type }) {
  return (
    <div className={`${Style.messageContainer} ${Style[type]} ${message ? Style.show : ''}`}>
      {message}
    </div>
  )
};
