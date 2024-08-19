import { motion, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type ToastNotificationProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const BaseNotification = styled(motion.div)`
  color: ${({ theme }) => theme.color};
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.background.main};
  border: 2px solid ${({ theme }) => theme.primary?.dark};
  z-index: 1001;

  &.success {
    border-color: ${({ theme }) => theme.success};
  }

  &.error {
    border-color: ${({ theme }) => theme.error};
  }

  &.info {
    border-color: ${({ theme }) => theme.info};
  }
`;

/**
 * A toast notification component that displays a message
 * @param children - The message to be displayed
 * @param props - Additional props to pass to the toast notification
 * @returns A toast notification component
 * @example
 * <ToastNotification>
 *  Success! Your changes have been saved.
 * </ToastNotification>
 */

const ToastNotification = (props: ToastNotificationProps) => {
  return (
    <BaseNotification
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      id="toast-notification"
      {...props}
    >
      {props.children}
    </BaseNotification>
  );
};

export default ToastNotification;
