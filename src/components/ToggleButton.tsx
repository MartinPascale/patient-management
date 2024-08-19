import styled, { useTheme } from 'styled-components';
import { useThemeContext } from '../contexts/ThemeContext';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background.main};
  }
`;

export const ThemeToggleButton = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  return (
    <StyledButton onClick={toggleTheme}>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={theme.primary.hover} fillRule="nonzero">
            <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"></path>
          </g>
        </g>
      </svg>
    </StyledButton>
  );
};
