"use client";

import HeaderMenu from "../../../components/headermenu";
import FriendsList from "./friends-list";
import FriendsMenu from "../../../components/friendsmenu";

const FriendsPage = () => {
  return (
    <div className="relative h-screen w-full overflow-y-auto bg-darkslategray-100">
      <HeaderMenu />
      <FriendsMenu />
      <FriendsList />
    </div>
  );
};

export default FriendsPage;
