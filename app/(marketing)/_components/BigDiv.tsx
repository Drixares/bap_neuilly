import React from 'react';

interface BigDivProps {
  children?: React.ReactNode;
  className?: string;
}

const BigDiv: React.FC<BigDivProps> = ({ children, className }) => {
  return (
    <div className="h-px w-full bg-[var(--marronf)]" />
  );
};

export default BigDiv; 