import { motion, MotionProps } from 'framer-motion';
import React, { ReactNode, HTMLAttributes } from 'react';
import styled from 'styled-components';

// Custom type to resolve conflicts between MotionProps and HTMLAttributes
type MergedProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> &
  MotionProps;

interface CardProps extends MergedProps {
  children?: ReactNode;
}

const BaseCard = styled(motion.div)`
  background-color: ${({ theme }) => theme?.primary.dark};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme?.background.accent};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 225px;

  @media (min-width: 850px) {
    margin-bottom: 16px;
  }
`;

// Wrtie jsdoc for the component
/**
 * A card component that displays content in a card layout
 * @param children - The content to be displayed in the card
 * @param props - Additional props to pass to the card ( as to any other div element)
 * @returns A card component
 * @example
 * <Card>
 *  <h1>Card Title</h1>
 *  <p>This is a card component</p>
 * </Card>
 */
const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <BaseCard
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

export default Card;
