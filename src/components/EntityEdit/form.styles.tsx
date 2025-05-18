import styled from "styled-components";

export const FormPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

export const FormContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: clamp(300px, 80vw, 500px);
  height: clamp(400px, 90vh, 700px);
  background: linear-gradient(
    135deg,
    var(--secondary-color),
    var(--primary-color)
  );
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const FormWrapper = styled.form`
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  width: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #242424;
  color: white;
  font-size: 1rem;
`;

export const FormTextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #242424;
  color: white;
  font-size: 1rem;
  resize: none;
  min-height: 100px;
  font-family: 'Inter', sans-serif;
`;

export const FormSubmitButton = styled.button`
  padding: 0.75rem;
  background-color: var(--secondary-color);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;