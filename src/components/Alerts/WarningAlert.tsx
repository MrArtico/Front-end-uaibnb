import styled from "styled-components";

const Alert = styled.div`
    position: absolute;
    bottom: 5px;
  background-color: #fef9c3; /* bg-yellow-100 */
  border-left: 4px solid #eab308; /* border-yellow-500 */
  color: #854d0e; /* text-yellow-900 */
  padding: 0.5rem; /* p-2 */
  border-radius: 0.5rem; /* rounded-lg */
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: default;

  &:hover {
    background-color: #fef08a; /* hover:bg-yellow-200 */
    transform: scale(1.05);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #78350f; /* dark:bg-yellow-900 */
    border-left-color: #a16207; /* dark:border-yellow-700 */
    color: #fefce8; /* dark:text-yellow-100 */

    &:hover {
      background-color: #854d0e; /* dark:hover:bg-yellow-800 */
    }
  }
`;

const Icon = styled.svg`
  stroke: currentColor;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-right: 0.5rem;
  color: #ca8a04; /* text-yellow-600 */
`;

const Text = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
`;

export default function WarningAlert({errorMessage} : {errorMessage: string}) {
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
