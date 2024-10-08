import { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from './Button';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 102;
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.primary.dark};
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  height: 65%;
  margin: 0 16px;
  position: relative;

  @media (min-width: 850px) {
    width: 400px;
    height: 550px;
  }
`;

const CloseButton = styled(Button).attrs({ variant: 'text' })`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  ariaLabel,
  children,
}) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <ModalContent
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        id="modal"
      >
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </Overlay>,
    modalRoot,
  );
};

export default Modal;
