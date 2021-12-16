import { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [actionType, setActionType] = useState("create");
	const [path, setpath] = useState("");
	const [values, setValues] = useState({});
	const [fields, setFields] = useState([]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = (actionType, path, fields, values) => {
		setActionType(actionType);
		setpath(path);
		setFields(fields);
		setValues(values);
		setIsOpen(true);
	};

	const value = {
		isOpen,
		closeModal,
		openModal,
		actionType,
		path,
		fields,
		values
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
