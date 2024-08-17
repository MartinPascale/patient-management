import styled from 'styled-components';
import { ThemeToggleButton } from './ToggleButton';

const NavbarContainer = styled.nav`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.main};
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.background.accent};
  padding: 8px 16px;

  @media (min-width: 768px) {
    padding: 8px 32px;
  }
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.background.accent};
  color: ${({ theme }) => theme.color};
  flex: 2;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.primary.dark};
  max-width: 400px;

  &::placeholder {
    color: ${({ theme }) => theme.color};
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.primary.hover};
  color: ${({ theme }) => theme.primary.hover};
  background-color: transparent;
  cursor: pointer;
  font-size: 1.3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Navbar: React.FC<{
  onSearch: (query: string) => void;
  onToggleTheme: () => void;
  handleAddPatient: () => void;
}> = ({ onSearch, onToggleTheme, handleAddPatient }) => {
  return (
    <NavbarContainer>
      <SearchInput
        type="text"
        placeholder="Search patients..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <ButtonContainer>
        <AddButton onClick={handleAddPatient} aria-label="add patient">
          +
        </AddButton>
        <ThemeToggleButton />
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
