import React from "react";

export interface NewFeatureCardProps {
  title: string;
  content: string;
  btnLabel: string;
  withButton?: boolean;
  className?: string;
}

export const NewFeatureCard: React.FC<NewFeatureCardProps> = ({
  title,
  content,
  btnLabel,
  withButton = false,
  className,
}) => {
  return (
    <div
      className={`${className} w-full sm:h-auto mt-5 bg-neutral-900 rounded-xl text-primary-content`}
    >
      <div className="card-body flex">
        <h2 className="card-title font-bold text-secondary">{title}</h2>
        <p className="text-slate-300">{content}</p>
        {withButton && (
          <div className="card-actions justify-end">
            <button className="btn">{btnLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
};
