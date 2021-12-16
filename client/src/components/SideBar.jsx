import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const SideBar = () => {
	const navItems = {
		ASEGURADOS: "fa-address-card",
		POLIZAS: "fa-file-alt",
		LISTADOS: "fa-chart-bar",
		COMPAÑIAS: "fa-landmark"
	};

	const [isOpen, setIsOpen] = useState(false);

	const handleOpenMenu = () => {
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<>
			<div className={`sideBar ${isOpen ? "sideBarOpen" : ""}`}>
				<i
					className="fas fa-bars"
					onClick={handleOpenMenu}
					id="sideBarBurguer"
				></i>
				<div className="linkList">
					{!isOpen &&
						Object.entries(navItems).map(([k, v]) => {
							return (
								<NavLink
									to={`/${k.toLowerCase()}`}
									activeClassName="navItemSelected"
									key={k}
									className="navItem"
									onClick={() => setIsOpen(false)}
								>
									<i className={`fas ${v}`}></i>
								</NavLink>
							);
						})}
					{isOpen &&
						Object.entries(navItems).map(([k, v]) => {
							return (
								<NavLink
									to={`/${k.toLowerCase()}`}
									activeClassName="navItemSelected2"
									key={k}
									className="navItem"
									onClick={() => setIsOpen(false)}
								>
									<i className={`fas ${v}`}></i>
									<p className="sideBarTitle">{k}</p>
								</NavLink>
							);
						})}
				</div>
			</div>
			{isOpen && (
				<div className="backgroundDark" onClick={handleOpenMenu}></div>
			)}
		</>
	);
};

export default SideBar;
