import React from 'react';

interface BigDivProps {
  children?: React.ReactNode;
  className?: string;
}

const BigDiv: React.FC<BigDivProps> = ({ children, className }) => {
  return (
    <div className={`
      w-full 
      h-px
      w-full
      bg-[var(--marronf)]
    `}></div>
  );
};

export default BigDiv; 