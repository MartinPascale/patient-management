import { useState } from 'react';
import styled from 'styled-components';

type AvatarProps = {
  src: string;
  name: string;
};

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.background.accent};
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

/**
 * Avatar component that displays an image with a circular border or the first 2 initials if image is not provided or fails to load
 * @param src - The image source to be displayed
 * @param alt - The alt text for the image
 * @returns An avatar component
 * @example
 * <Avatar src="https://example.com/image.jpg" name="John Doe" />
 */
const Avatar = ({ src, name }: AvatarProps) => {
  const [displayImage, setDisplayImage] = useState(true);

  const getInitials = (name: string) => {
    const firstInitial = name.charAt(0).toUpperCase();
    const secondInitial = name.split(' ')[1]?.charAt(0).toUpperCase();

    return `${firstInitial}${secondInitial ? secondInitial : ''}`;
  };

  const handleImageError = () => {
    setDisplayImage(false);
  };

  return (
    <AvatarContainer>
      {displayImage ? (
        <AvatarImg src={src} alt={name} onError={handleImageError} />
      ) : (
        getInitials(name)
      )}
    </AvatarContainer>
  );
};

export default Avatar;
