import React from "react";

export type UserType = {
  id: number;
  username: string;
  avatar: Uint8Array | null;
};

export type ProfileType = {
  userId: number;
  bio: string;
};

export type GameSummaryType = {
  userId: number;
  totalCount: number;
  wonCount: number;
  lostCount: number;
};

export type MatchType = {
  gameId: number;
  user1Id: number;
  user2Id: number;
  user1Score: number;
  user2Score: number;
  startedAt: string;
  endedAt: string;
};

export type ModalWindowType = {
  ref: React.MutableRefObject<HTMLDialogElement | null>;
  showModal: () => void;
  closeModal: () => void;
};
