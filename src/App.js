import React, { useState } from "react";
import data from "buttonData";
import classnames from "classnames";

function App() {
	const populateButton = () => {
		return data.map((dt, idx) => (
			<div className={classnames("button", dt.type)}>
				<span>{dt.text}</span>
			</div>
		));
	};

	const changeTheme = (e, number) => {
		const bodyElement = document.querySelector("body");
		const indicatorElement = document.querySelectorAll(".indicator");
		// Change active
		indicatorElement.forEach((element) => {
			element.classList.remove("active");
		});
		e.target.classList.add("active");

		// Inject theme to body
		bodyElement.className = "";
		bodyElement.classList.add("theme" + number);
	};

	return (
		<div className="App">
			<div className="top">
				<div className="title">calc</div>
				<div className="theme">
					<span>Theme</span>
					<div className="select">
						<div className="indicator active" onClick={(e) => changeTheme(e, 1)}></div>
						<div className="indicator" onClick={(e) => changeTheme(e, 2)}></div>
						<div className="indicator" onClick={(e) => changeTheme(e, 3)}></div>
					</div>
				</div>
			</div>
			<div className="screen">
				<span>123456</span>
			</div>
			<div className="operation">{populateButton()}</div>
		</div>
	);
}

export default App;
