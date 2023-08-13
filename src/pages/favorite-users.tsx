import { useAuth0 } from "@auth0/auth0-react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Swal from "sweetalert2";
import { AppLayout } from "../components/layout/layout";
import { NewFavoriteUserModal } from "../components/new-favorite-user-modal";
import { useAxios } from "../hooks/use-axios";
import {
  deleteFavoriteUserById,
  getFavoritesByEmail,
  postFavoriteUSer,
} from "../services/favorites";

export const FavoriteUsers: React.FC = () => {
  const [idFavorite, setIdFavorite] = React.useState<number | null>(null);
  const [emailFavorite, setEmailFavorite] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { user } = useAuth0();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { response, executeFetch } = useAxios<any>(
    getFavoritesByEmail(user?.email || ""),
    false
  );

  React.useEffect(() => {
    if (user) {
      executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [favUserMail, setFavUserMail] = React.useState<string>("");

  const postFavoriteUserFetch = useAxios(
    postFavoriteUSer(user?.email || "", favUserMail),
    false
  );

  const deleteFavoriteUserFetch = useAxios(
    deleteFavoriteUserById(idFavorite),
    false
  );

  const handleAddNewUser = async () => {
    if (isValidEmail(favUserMail)) {
      postFavoriteUserFetch.executeFetch().then(() => executeFetch());
      Swal.fire({
        title: "User has been added to your favorites",
        background: "#111827",
        icon: "success",
        confirmButtonColor: "#BA2092",
        confirmButtonText: "OK !",
        color: "white",
      });
    } else {
      // Handle invalid email input (e.g., show an error message)
      Swal.fire({
        title: "invalid email format",
        background: "#111827",
        icon: "error",
        confirmButtonColor: "#BA2092",
        confirmButtonText: "OK !",
        color: "white",
      });
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDeleteUser = (idFav: number) => {
    setIdFavorite(idFav);
  };

  React.useEffect(() => {
    if (idFavorite) {
      Swal.fire({
        title: `You are removing user with email: <span class="text-secondary">${emailFavorite}</span>`,
        showCancelButton: true,
        confirmButtonText: "Remove",
        confirmButtonColor: "#BA2092",
        allowEscapeKey: true,
        allowOutsideClick: true,
        background: "#111827",
        color: "white",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFavoriteUserFetch.executeFetch().then(() => {
            executeFetch();
          });
          Swal.fire({
            title: "User removed with success",
            background: "#111827",
            icon: "success",
            confirmButtonColor: "#BA2092",
            confirmButtonText: "OK !",
            color: "white",
          });
        } else if (result.isDenied) {
          Swal.fire({
            title: "Changes are not saved",
            background: "#111827",
            icon: "info",
            confirmButtonColor: "#BA2092",
            confirmButtonText: "OK !",
            color: "white",
          });
        }
      });
    }
    setModalOpen(false);
  }, [idFavorite, modalOpen]);

  return (
    <AppLayout>
      <NewFavoriteUserModal
        onConfirm={handleAddNewUser}
        onEmailChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFavUserMail(event.target.value)
        }
      />
      {/* <div className="badge">Page under construction</div> */}
      <h1 className="text-2xl my-16 text-center text-slate-300 font-bold">
        Add a new favorite user to share your todos faster ! 🚀
      </h1>
      <div className="w-full mt-10 mb-5 items-center flex justify-between">
        <p className="text-xl font-bold">Your favorite users</p>
        <button
          onClick={() => window.newFavoriteUserModal.showModal()}
          className="btn btn-secondary hover:bg-opacity-50 bg-opacity-25"
        >
          New favorite user
        </button>
      </div>

      {user && response?.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response?.map((favUser: any, index: number) => (
            <div className="flex flex-col">
              <div
                className="mb-2 flex items-center justify-between bg-slate-900 px-6 py-1.5 rounded-xl font-semibold text-sm"
                key={index}
              >
                <span>{favUser.favorites.toUpperCase()}</span>
                <span
                  onClick={() => {
                    handleDeleteUser(favUser.id);
                    setEmailFavorite(favUser.favorites);
                    setModalOpen(true);
                  }}
                  className="btn bg-slate-800 hover:bg-slate-700 border-0"
                >
                  <XCircleIcon className="w-6 cursor-pointer text-red-600" />
                </span>
              </div>
            </div>
          ))
        : "You do not have favorite users :("}
    </AppLayout>
  );
};
