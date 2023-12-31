"use client";

import React from "react";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import MAddFriend from "../../../components/modal/m-add-friend";
import { useRouter } from "next/navigation";
import HeaderMenu from "../../../components/headermenu";
import ModalPopup from "../../../components/modal/modal-popup";
import BlockedList from "./blocked-list";

const FriendsBlockedPage: NextPage = () => {
  const [isMAddFriendPopupOpen, setMAddFriendPopupOpen] = useState(false);
  const router = useRouter();

  const onAllClick = useCallback(() => {
    router.push("/profile/me/friends");
  }, [router]);

  const openMAddFriendPopup = useCallback(() => {
    setMAddFriendPopupOpen(true);
  }, []);

  const closeMAddFriendPopup = useCallback(() => {
    setMAddFriendPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative h-screen w-full overflow-y-auto bg-darkslategray-100 text-left font-body text-5xl text-base-white">
        <HeaderMenu />
        <div className="absolute left-[470px] top-[327px] h-[52px] w-[500px] text-xl">
          <img
            className="absolute left-[calc(50%_-_250px)] top-[49.5px] h-[5px] w-[500px]"
            alt=""
            src="/line-1.svg"
          />
          <button
            className="absolute left-[calc(50%_-_183px)] top-[5px] inline-block cursor-pointer bg-[transparent] p-0 text-left font-body text-xl tracking-[0.1em] text-darkgray-300 [border:none]"
            onClick={onAllClick}
          >
            All
          </button>
          <div className="absolute left-[calc(50%_-_68px)] top-[0px] h-8 w-[119px] bg-dimgray-100" />
          <div className="absolute left-[calc(50%_-_48px)] top-[5px] tracking-[0.1em]">
            Blocked
          </div>
          <button
            className="absolute left-[calc(50%_+_101px)] top-[5px] inline-block cursor-pointer bg-[transparent] p-0 text-left font-body text-xl tracking-[0.1em] text-darkgray-300 [border:none]"
            onClick={openMAddFriendPopup}
          >
            add friend
          </button>
        </div>
        <BlockedList />
      </div>
      {isMAddFriendPopupOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMAddFriendPopup}
        >
          <MAddFriend onClose={closeMAddFriendPopup} />
        </ModalPopup>
      )}
    </>
  );
};

export default FriendsBlockedPage;
