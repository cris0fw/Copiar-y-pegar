import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../hook/useAuth";

const DropDownMenu = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const singInOut = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-md shadow-lg">
      <ul className="flex flex-col p-2">
        <li>
          <Link
            href="/account"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Mi account
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Order
          </Link>
        </li>
        <li>
          <p
            href="/account"
            className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={singInOut}
          >
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
