import { useState } from "react";
import styled from "styled-components";

const SwitchOptions = () => {
	const [select, setSelect] = useState('React');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelect(event.target.value);
	};

	return (
		<RadioInputs>
			<RadioLabel>
				<RadioInput
					type="radio"
					name="radio"
					value="React"
					checked={select === 'React'}
					onChange={handleChange}
				/>
				<RadioSpan>Locações</RadioSpan>
			</RadioLabel>
			<RadioLabel >
				<RadioInput
					type="radio"
					name="radio"
					value="HTML"
					checked={select === 'HTML'}
					onChange={handleChange}
				/>
				<RadioSpan>Caracteristicas</RadioSpan>
			</RadioLabel>

			{/* <RadioLabel >
				<RadioInput
					type="radio"
					name="radio"
					value="Vue"
					checked={select === 'Vue'}
					onChange={handleChange}
				/>
				<RadioSpan>Vue</RadioSpan>
			</RadioLabel> */}
		</RadioInputs>
	);
};

export default SwitchOptions;

const RadioInputs = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	border-radius: 0.5rem;
	background-color: #EEE;
	box-sizing: border-box;
	box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
	padding: 0.25rem;
	width: 300px;
	font-size: 14px;
    gap: 2px;
`;

const RadioLabel = styled.label`
	flex: 1 1 auto;
	text-align: center;

    input:checked + span {
        background-color: #4CAF50;
    }
`;

const RadioInput = styled.input`
	display: none;
`;

const RadioSpan = styled.span`
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	border: none;
	padding: .5rem 0;
	color: rgba(51, 65, 85, 1);
	transition: all .15s ease-in-out;
`;

