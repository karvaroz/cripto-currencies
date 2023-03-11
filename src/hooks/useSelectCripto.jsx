import styled from "@emotion/styled";
import React, { Fragment, useState } from "react";

const Label = styled.label`
	color: #fff;
	display: block;
	font-family: "Lato", sans-serif;
	font-size: 24px;
	font-weight: 700;
	margin: 15px 0;
`;

const Select = styled.select`
	width: 100%;
	font-size: 18px;
	padding: 14px;
	border-radius: 10px;
`;

const useSelectCripto = (label, options) => {
	const [state, setState] = useState("");

	const SelectCurrency = () => (
		<Fragment>
			<Label htmlFor="">{label}</Label>
			<Select
				name=""
				id=""
				value={state}
				onChange={(e) => setState(e.target.value)}>
				<option value="">Seleccione</option>
				{options.map((opt) => (
					<option
						key={opt.id}
						value={opt.id}>
						{opt.name}
					</option>
				))}
			</Select>
		</Fragment>
	);

	return [state, SelectCurrency];
};

export default useSelectCripto;
