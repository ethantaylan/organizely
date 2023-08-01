import React from "react";

export interface NewFavoriteUserModalProps {
  onConfirm: () => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NewFavoriteUserModal: React.FC<NewFavoriteUserModalProps> = ({
  onConfirm,
  onEmailChange
}) => {
  return (
    <React.Fragment>
      <dialog id="newFavoriteUserModal" className="modal">
        <form method="dialog" className="modal-box bg-slate-800">
          <h3 className="font-bold mb-5 text-white text-lg">
            New favorite user
          </h3>
          <div className="flex flex-col">
            <label htmlFor="new-fav-user">User email</label>
            <input onChange={onEmailChange} className="input bg-slate-700" />
          </div>

          <div className="modal-action">
            <button className="btn text-white btn-ghost">Cancel</button>
            <button onClick={onConfirm} className="btn btn-secondary">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
