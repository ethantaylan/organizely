import { useAuth0 } from "@auth0/auth0-react";
import { UserIcon } from "@heroicons/react/24/solid";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-ghost btn-square"
      onClick={() => {
        loginWithRedirect();
      }}
    >
      <UserIcon className="w-5" />
    </button>
  );
};

export default LoginButton;
