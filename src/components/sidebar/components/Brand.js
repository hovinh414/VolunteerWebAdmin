import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text, Image, Center } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import "@fontsource/roboto";
import avatar from '../../../assets/img/auth/icon.png'
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Flex align="center" direction="row" justifyContent={'center'}>
        <Image
          src={avatar}
          size="sm"
          w="50px"
          h="50px"
          mr="10px"
          borderRadius={50}
        />
        <Text
          fontFamily="Roboto"
          fontSize="40"
          fontWeight="bold"
          color={logoColor}
        >
          Việc Tử Tế
        </Text>
      </Flex>

      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
