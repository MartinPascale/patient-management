import { motion } from 'framer-motion';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 80px;
`;

const SkeletonCard = styled(motion.div)`
  width: 100%;
  height: 225px;
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%);
  background-size: 200% 100%;
  border-radius: 12px;

  @media (min-width: 850px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (min-width: 1280px) {
    flex: 1 1 calc(33% - 16px);
  }
`;

const shimmer = {
  initial: { backgroundPosition: '200% 0' },
  animate: {
    backgroundPosition: '-200% 0',
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const Skeleton = () => {
  console.log('Skeleton');
  return (
    <SkeletonWrapper>
      {Array.from({ length: 12 }).map(() => (
        <SkeletonCard variants={shimmer} initial="initial" animate="animate" />
      ))}
    </SkeletonWrapper>
  );
};

export default Skeleton;
