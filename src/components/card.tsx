import React from "react";

export interface CardProps {
  title: string;
  content: string;
  btnLabel: string;
  withButton?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  btnLabel,
  withButton = false,
  className,
}) => {
  return (
    <div
      className={`${className} w-full sm:h-auto card mt-5 border-opacity-40 bg-secondary bg-opacity-10 border-secondary border text-primary-content`}
    >
      <div className="card-body flex">
        <h2 className="card-title font-bold text-secondary">{title}</h2>
        <p className="text-white">{content}</p>
        {withButton && (
          <div className="card-actions justify-end">
            <button className="btn">{btnLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
};
