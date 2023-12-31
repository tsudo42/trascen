"use client";

import React, { useContext, useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import GameWonPage from "./game-won";
import GameLostPage from "./game-lost";
import { GameInfoType } from "../../types";
import { ProfileContext } from "../../../layout";
import { ProfileType } from "@/app/types";
import DefaultErrorPage from "next/error";

const GameResultUI = ({ params }: { params: { id: string } }) => {
  const profile: ProfileType = useContext(ProfileContext);
  const [isWon, setIsWon] = useState<boolean | undefined>();

  useEffect(() => {
    if (profile && profile.userId) {
      // ゲーム結果を取得
      makeAPIRequest<GameInfoType>("get", `/games/${params.id}`)
        .then((result) => {
          if (result.success) {
            if (result.data.endedAt != null) {
              if (
                (result.data.user1.id === profile.userId &&
                  result.data.user1Score > result.data.user2Score) ||
                (result.data.user2.id === profile.userId &&
                  result.data.user1Score < result.data.user2Score)
              ) {
                setIsWon(true);
              } else {
                setIsWon(false);
              }
            }
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  if (isWon === true) {
    return <GameWonPage />;
  } else if (isWon === false) {
    return <GameLostPage />;
  } else {
    return <DefaultErrorPage statusCode={404} />;
  }
};

export default GameResultUI;
