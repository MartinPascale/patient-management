import styled from 'styled-components';
import { ThemeToggleButton } from './ToggleButton';
import Button from './ui/Button';

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
  z-index: 10;

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
}> = ({ onSearch, handleAddPatient }) => {
  return (
    <NavbarContainer>
      <SearchInput
        type="text"
        placeholder="Search patients..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <ButtonContainer>
        <Button
          onClick={handleAddPatient}
          aria-label="add patient"
          style={{
            height: '40px',
          }}
          id="add-patient-button"
        >
          Add Patient
        </Button>
        <ThemeToggleButton />
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
