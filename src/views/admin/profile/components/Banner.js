// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import "@fontsource/roboto";
export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} w="100%" h="100%" align="center">
      <Box
        bg={`url(${banner})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        borderRadius="16px"
        h="250px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="150"
        w="150px"
        mt="-75px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text
        fontFamily="Roboto"
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="xl"
        mt="10px"
      >
        {name}
      </Text>
      <Text fontFamily="Roboto" color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontSize="2xl"
            fontWeight="700"
          >
            {posts}
          </Text>
          <Text
            fontFamily="Roboto"
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
          >
            Posts
          </Text>
        </Flex>
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontSize="2xl"
            fontWeight="700"
          >
            {followers}
          </Text>
          <Text
            fontFamily="Roboto"
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
          >
            Followers
          </Text>
        </Flex>
        <Flex mx="auto" align="center" direction="column">
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontSize="2xl"
            fontWeight="700"
          >
            {following}
          </Text>
          <Text
            fontFamily="Roboto"
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
          >
            Following
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
