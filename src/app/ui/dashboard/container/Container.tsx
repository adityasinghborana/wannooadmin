import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: any; // Allows any other additional props
}

const Container: FC<ContainerProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`min-h-screen bg-gray-100 mt-2 rounded-3xl ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
