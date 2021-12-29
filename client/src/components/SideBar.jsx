import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SideBar = () => {
	const navItems = [
		{
			label: "INICIO",
			icon: "fa-home",
			link: "/"
		},
		{
			label: "ASEGURADOS",
			icon: "fa-address-card",
			link: "/asegurados"
		},
		{
			label: "POLIZAS",
			icon: "fa-file-alt",
			link: "/polizas"
		},
		{
			label: "LISTADOS",
			icon: "fa-chart-bar",
			link: "/listados"
		}
	];

	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useContext(AuthContext);

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
						navItems.map(i => {
							return (
								<NavLink
									key={i.label}
									to={i.link}
									className="navItem"
									activeClassName="navItemSelected"
									exact={i.link === "/"}
									onClick={() => setIsOpen(false)}
								>
									<i className={`fas ${i.icon}`}></i>
								</NavLink>
							);
						})}
					{isOpen &&
						navItems.map(i => {
							return (
								<NavLink
									key={i.label}
									to={i.link}
									className="navItem"
									activeClassName="navItemSelected2"
									exact={i.link === "/"}
									onClick={() => setIsOpen(false)}
								>
									<i className={`fas ${i.icon}`}></i>
									{i.label}
								</NavLink>
							);
						})}
				</div>
				{isOpen && (
					<div className="navItem logout" onClick={logout}>
						<i className="fas fa-sign-out-alt"></i>
						<p className="sideBarTitle">CERRAR SESION</p>
					</div>
				)}
			</div>
			{isOpen && (
				<div className="backgroundDark" onClick={handleOpenMenu}></div>
			)}
		</>
	);
};

export default SideBar;
