import React from "react";

export interface AlertProps {
  title: string;
  className: string;
}

export const Alert: React.FC<AlertProps> = ({ title, className }) => {
  return (
    <div className={className}>
      <span>{title}</span>
    </div>
  );
};
