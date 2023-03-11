import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectCripto from "../hooks/useSelectCripto";
import { Currencies } from "../data/currencies";
import Error from "./Error";

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 30px;
	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const Form = ({ setCurrencies }) => {
	const [criptos, setCriptos] = useState([]);
	const [error, setError] = useState(false);

	const [Currency, SelectCurrency] = useSelectCripto(
		"Elige tu moneda",
		Currencies
	);
	const [CriptoCurrency, SelectCriptoCurrency] = useSelectCripto(
		"Elige tu criptomoneda",
		criptos
	);

	useEffect(() => {
		const fetchApi = async () => {
			const URL =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
			const response = await fetch(URL);
			const result = await response.json();

			const CriptosList = result.Data.map((cripto) => {
				const obj = {
					id: cripto.CoinInfo.Name,
					name: cripto.CoinInfo.FullName,
				};
				return obj;
			});

			setCriptos(CriptosList);
		};
		fetchApi();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([Currency, CriptoCurrency].includes("")) {
			setError(true);
			return;
		}
		setError(false);
		setCurrencies({
			Currency,
			CriptoCurrency,
		});
	};

	return (
		<Fragment>
			{error && <Error>Debe seleccionar una moneda y una criptomoneda</Error>}
			<form onSubmit={handleSubmit}>
				<SelectCurrency />
				<SelectCriptoCurrency />
				<InputSubmit
					type="submit"
					value="Cotizar"
				/>
			</form>
		</Fragment>
	);
};

export default Form;
