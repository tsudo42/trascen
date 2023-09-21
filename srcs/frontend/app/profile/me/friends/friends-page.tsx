"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderMenu from "../../../components/headermenu";
import FriendsList from "./friendsList";

const FriendsPage: NextPage = () => {
  const router = useRouter();

  const onBlockedClick = useCallback(() => {
    router.push("/profile/me/blocked");
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100">
      <HeaderMenu />
      <FriendsList
        icon2="/icon2.svg"
        icon3="/icon3.svg"
        icon4="/icon4.svg"
        friendsPosition="absolute"
        friendsTop="327px"
        friendsLeft="470px"
        iconCursor="pointer"
        onBlockedClick={onBlockedClick}
      />
    </div>
  );
};

export default FriendsPage;