import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import data from 'buttonData';
import { checkColorScheme } from 'helper';

function App() {
	const [input, setInput] = useState([0]);
	const [theme, setTheme] = useState(
		window.localStorage.getItem('theme') || checkColorScheme()
	);

	useEffect(() => {
		changeTheme(theme);
	}, [theme]);

	const buttonClick = (dt) => {
		let result = 0;
		const temp = [...input];
		const operationArr = ['/', '+', '-', '.', 'x'];
		const isOperation = operationArr.indexOf(temp[temp.length - 1]) > -1;

		switch (dt.type) {
			case 'reset':
				return setInput([0]);
			case 'del':
				if (temp.length === 1) {
					return setInput([0]);
				}
				temp.splice(-1, 1);
				return setInput(temp);
			case 'submit':
				if (isOperation) {
					temp.splice(-1, 1);
				}
				// eslint-disable-next-line no-eval
				result = eval(temp.join('').replace('x', '*'));
				return setInput([result]);
			case 'operation':
				if (isOperation) {
					temp.splice(-1, 1);
				}
				temp.push(dt.text);
				return setInput(temp);
			default:
				if (temp[0] === 0 && temp.length === 1 && dt.type === 'number') {
					temp.splice(-1, 1);
				}
				temp.push(dt.text);
				return setInput(temp);
		}
	};

	const changeTheme = (number) => {
		const bodyElement = document.querySelector('body');
		const indicatorElement = document.querySelectorAll('.indicator');

		// Set to local storage
		window.localStorage.setItem('theme', number);

		// Inject theme to body
		bodyElement.className = '';
		bodyElement.classList.add(`theme${number}`);

		setTheme(number);
	};

	const populateTheme = () => {
		const arr = [];

		for (let index = 1; index < 4; index++) {
			arr.push(
				<div
					key={`theme${index}`}
					className={classnames(
						'indicator',
						parseInt(theme, 10) === index && 'active'
					)}
					onClick={() => changeTheme(index)}
					role="button"
					aria-label="theme1"
					tabIndex={0}
				/>
			);
		}
		return arr;
	};

	const populateButton = () =>
		data.map((dt) => (
			<div
				key={dt.text}
				className={classnames('button', dt.type)}
				onClick={() => buttonClick(dt)}
				role="button"
				tabIndex={0}
			>
				<span>{dt.text}</span>
			</div>
		));

	return (
		<div className="App">
			<div className="top">
				<div className="title">calc</div>
				<div className="theme">
					<span>Theme</span>
					<div className="select">{populateTheme()}</div>
				</div>
			</div>
			<div className="screen">
				<input type="text" value={input.join('')} readOnly />
			</div>
			<div className="operation">{populateButton()}</div>
		</div>
	);
}

export default App;
