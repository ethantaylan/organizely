import React from "react";

export interface SwitchProps {
  value: boolean | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ value, onChange, onClick }) => {
  return (
    <div onClick={onClick} className="form-control">
      <label className="cursor-pointer label">
        <input
          onChange={onChange}
          type="checkbox"
          className="toggle toggle-secondary"
          checked={value || false}
        />
      </label>
    </div>
  );
};
