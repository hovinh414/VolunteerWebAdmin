// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import "@fontsource/roboto";
export default function ChatCard(props) {
  const { message, name, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Avatar h="80px" w="80px" src={image} me="20px" />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={18}
            mb="4px"
          >
            {name}
          </Text>
          <Text
            fontFamily="Roboto"
            fontWeight="500"
            color={textColorPrimary}
            fontSize={15}
            me="4px"
          >
            {message}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
