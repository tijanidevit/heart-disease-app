import React, { useEffect, useState } from "react";
import { Image, Center } from "native-base";
import Logo from "../assets/logo.png";

const s = require("../style");
export const CenterLogo = () => {
  return (
    <Center>
      <Image source={Logo} style={s.logoSm} alt="Logo" />
    </Center>
  );
};
