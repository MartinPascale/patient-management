import { motion, MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Combine MotionProps and ButtonHTMLAttributes
type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const BaseButton = styled(motion.button)<MotionButtonProps>`
  position: relative;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const containedButtonVariants = {
  hover: { scale: 1.05, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' },
  tap: { scale: 0.95, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' },
};

const outlinedAnimationVariants = {
  hover: (custom: { hoverBgColor: string; hoverTextColor: string }) => ({
    backgroundColor: custom.hoverBgColor,
    color: custom.hoverTextColor,
  }),
  tap: {},
};

const OutlinedButton = styled(BaseButton).attrs(({ theme }) => ({
  custom: {
    hoverBgColor: theme.primary.default,
    hoverTextColor: theme.primary.dark,
  },
  whileHover: 'hover',
  whileTap: 'tap',
  variants: outlinedAnimationVariants,
}))`
  background-color: transparent;
  color: ${({ theme }) => theme?.primary.default};
  border: 1px solid ${({ theme }) => theme?.primary.default};
`;

const ContainedButton = styled(BaseButton).attrs(() => ({
  whileHover: 'hover',
  whileTap: 'tap',
  variants: containedButtonVariants,
}))`
  background-color: ${({ theme }) => theme?.primary.default};
  color: white;
`;

const TextButton = styled(BaseButton)`
  background-color: transparent;
  color: ${({ theme }) => theme?.primary.default};
  border: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Interface for the Button component, combining MotionProps and ButtonHTMLAttributes
interface ButtonProps extends MotionButtonProps {
  variant?: 'outlined' | 'contained' | 'text';
}

/**
 * A button component that accepts a variant prop to change its appearance. Defaults to 'contained'.
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {React.ReactElement} The Button component.
 * @example
 * <Button variant="outlined" onClick={handleClick}>
 *  Click me
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  children,
  ...props
}) => {
  const buttonVariants = {
    contained: ContainedButton,
    outlined: OutlinedButton,
    text: TextButton,
  };

  const ButtonComponent = buttonVariants[variant];

  return <ButtonComponent {...props}>{children}</ButtonComponent>;
};

export default Button;
