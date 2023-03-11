import styled from "@emotion/styled";
import { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import ImgCripto from "./img/imagen-criptos.png";

const Container = styled.div`
	max-width: 900px;
	margin: 0 auto;
	width: 90%;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Image = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0 auto;
	display: block;
`;

const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	color: #fff;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;

	&::after {
		content: "";
		width: 100%;
		height: 6px;
		background-color: #66a2fe;
		display: block;
		margin: 10px auto 0 auto;
	}
`;

function App() {
	const [currencies, setCurrencies] = useState({});
	const [infoResults, setInfoResults] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(currencies).length > 0) {
			const getCriptoInfo = async () => {
				setLoading(true);
				setInfoResults({});
				const { Currency, CriptoCurrency } = currencies;
				const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${CriptoCurrency}&tsyms=${Currency}`;
				const response = await fetch(URL);
				const result = await response.json();
				setInfoResults(result.DISPLAY[CriptoCurrency][Currency]);
				setLoading(false);
			};
			getCriptoInfo();
		}
	}, [currencies]);

	return (
		<Container>
			<Image
				src={ImgCripto}
				alt="criptocurrencies"
			/>
			<Fragment>
				<Heading>Cotiza Criptomonedas al Instante</Heading>
				<Form setCurrencies={setCurrencies} />
				{loading && <Spinner />}
				{infoResults.PRICE && <Result infoResults={infoResults} />}
			</Fragment>
		</Container>
	);
}

export default App;
