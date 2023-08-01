import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Swal from "sweetalert2";
import { AppLayout } from "../components/layout/layout";
import { NewFavoriteUserModal } from "../components/new-favorite-user-modal";
import { useAxios } from "../hooks/use-axios";
import { getFavoritesByEmail, postFavoriteUSer } from "../services/favorites";

export const FavoriteUsers: React.FC = () => {
  const [favoriteUsers, setFavoriteUsers] = React.useState<string[]>([]);

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
  }, [user]);

  React.useEffect(() => {
    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFavoriteUsers(response.map((fav: any) => fav.favorites));
    }
  }, [response]);

  const [favUserMail, setFavUserMail] = React.useState<string>("");

  const postFavoriteUserFetch = useAxios(
    postFavoriteUSer(user?.email || "", favUserMail),
    false
  );

  const handleAddNewUser = async () => {
    if (isValidEmail(favUserMail)) {
      postFavoriteUserFetch.executeFetch().then(() => executeFetch());
    } else {
      // Handle invalid email input (e.g., show an error message)
      Swal.fire("Invalid email format", "", "error");
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AppLayout>
      <NewFavoriteUserModal
        onConfirm={handleAddNewUser}
        onEmailChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFavUserMail(event.target.value)
        }
      />
      <div className="badge">Page under construct</div>
      <h1 className="text-2xl mt-5 text-center text-secondary bg-secondary bg-opacity-20 border border-secondary p-5 rounded-xl font-bold">
        Add a new favorite user to share your todos faster !
      </h1>
      <div className="w-full mt-10 mb-5 items-center flex justify-between">
        <h2 className="text-white font-bold">My favorite users: </h2>
        <button
          onClick={() => window.newFavoriteUserModal.showModal()}
          className="btn btn-xs btn-secondary"
        >
          Add new favorite user
        </button>
      </div>

      {user &&
        favoriteUsers.map((favUser, index) => (
          <p className="mb-2" key={index}>
            {favUser}
          </p>
        ))}
      {/* <label htmlFor=""></label>
      <input className="input"></input> */}
    </AppLayout>
  );
};
