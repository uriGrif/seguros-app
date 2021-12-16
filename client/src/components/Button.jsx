import "../styles/Button.css";

const Button = props => {
	return (
		<button
			onClick={props.onClick}
			className="myButton"
			type={props.type || "button"}
		>
			{props.text}
		</button>
	);
};

export default Button;
