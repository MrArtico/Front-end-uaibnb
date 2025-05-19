import styled from "styled-components";

const Alert = styled.div`
	position: absolute;
  background-color: #fee2e2; /* bg-red-100 */
  bottom: 5px;
		border-left: 4px solid #ef4444; /* border-red-500 */
		color: #991b1b; /* text-red-900 */
		padding: 0.5rem; /* p-2 */
		border-radius: 0.5rem; /* rounded-lg */
		display: flex;
		align-items: center;
		transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
		cursor: default;

		&:hover {
			background-color: #fecaca; /* hover:bg-red-200 */
			transform: scale(1.05); /* hover:scale-105 */
		}

		/* Dark mode */
		@media (prefers-color-scheme: dark) {
			background-color: #7f1d1d; /* dark:bg-red-900 */
			border-left-color: #7f1d1d; /* dark:border-red-700 */
			color: #fef2f2; /* dark:text-red-100 */

			&:hover {
				background-color: #991b1b; /* dark:hover:bg-red-800 */
			}
		}
`;

const Icon = styled.svg`
	stroke: currentColor;
	width: 1.25rem; /* h-5 w-5 */
	height: 1.25rem;
	flex-shrink: 0;
	margin-right: 0.5rem; /* mr-2 */
	color: #dc2626; /* text-red-600 */
`;

const Text = styled.p`
	font-size: 0.75rem; /* text-xs */
	font-weight: 600; /* font-semibold */
`;

export default function ErrorAlert({errorMessage} : {errorMessage: string | null}) {
	return (
		<Alert role="alert">
			<Icon
				stroke="currentColor"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				strokeWidth="2"
				strokeLinejoin="round"
				strokeLinecap="round"
			>
				<path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</Icon>
			<Text>{errorMessage}</Text>
		</Alert>
	);
}
