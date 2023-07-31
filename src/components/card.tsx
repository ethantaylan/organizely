import React from "react";

export interface CardProps {
  title: string;
  content: string;
  btnLabel: string;
  withButton?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  btnLabel,
  withButton = false,
}) => {
  const today = new Date();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = today.toLocaleString(undefined, options);

  return (
    <div className="card mt-5 w-96 border-opacity-40 bg-secondary bg-opacity-20 border-secondary border text-primary-content">
      <div className="card-body">
        <h2 className="card-title font-bold text-secondary">{title}</h2>
        <p className="text-white">{content}</p>
        <p
          style={{ fontSize: 11 }}
          className="text-end font-bold text-secondary text-opacity-75 mt-5 text-sm"
        >
          {date}
        </p>
        {withButton && (
          <div className="card-actions justify-end">
            <button className="btn">{btnLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
};
