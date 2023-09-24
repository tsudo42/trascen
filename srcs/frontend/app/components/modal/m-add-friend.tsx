import React from "react";
import type { NextPage } from "next";
import { TextField } from "@mui/material";

type MAddFriendType = {
  onClose?: () => void;
};

// eslint-disable-next-line no-unused-vars
const MAddFriend: NextPage<MAddFriendType> = ({ onClose }) => {
  return (
    <div className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-white">
      <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
        Add friend
      </div>
      <TextField
        id="filled-basic"
        className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        label="friend name"
        size="medium"
        margin="none"
        required
      />
      <button className="absolute left-[75px] top-[181px] h-[42px] w-[253px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[240.84px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute left-[50.9px] top-[8px] inline-block h-[34px] w-[202.1px] text-left font-body text-5xl tracking-[0.1em] text-white">
          Add friend
        </div>
      </button>
    </div>
  );
};

export default MAddFriend;
