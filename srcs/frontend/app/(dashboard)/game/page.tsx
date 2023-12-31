"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../components/game-background";
import makeAPIRequest from "@/app/api/api";
import { ProfileType } from "@/app/types";
import { ProfileContext } from "../layout";
import { GameInfoType } from "./types";
import HeaderMenu from "../components/headermenu";

const GameUI = () => {
  const router = useRouter();
  const profile: ProfileType = useContext(ProfileContext);

  useEffect(() => {
    if (profile && profile.userId) {
      // 継続中のゲームがあればページ遷移
      makeAPIRequest<GameInfoType[]>("get", `/games/user/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            result.data.map((gameInfo) => {
              if (gameInfo.startedAt != null && gameInfo.endedAt === null) {
                router.push(`/game/${gameInfo.gameId}`);
                return;
              }
            });
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  return (
    <>
      <GameBackground user1="" user2="">
        <div className="flex h-screen items-center justify-center">
          <button
            onClick={() => router.push("/game/preparing")}
            className="group flex cursor-pointer items-center rounded-lg bg-black p-2 text-white hover:bg-gray-700"
          >
            <span className="shrink-0 px-8 text-29xl">Play game</span>
          </button>
          <span className="px-8 text-xl">
            - w key to move up your paddle, s key to move down!
            <br />- The first one to get displayed points wins.
          </span>
        </div>
      </GameBackground>
      <HeaderMenu />
    </>
  );
};

export default GameUI;
