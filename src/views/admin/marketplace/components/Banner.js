import React from "react";

// Chakra imports
import { Image, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/banner.png";

export default function Banner() {
  // Chakra Color Mode
  return <Image src={banner} h="25%" w="100%" borderRadius={"25px"} />;
}
