
// import './Button.css';

function Button(props) {
  return (
    <button className={`${props.className??""} button`} onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

export default Button;