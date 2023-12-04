// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  ButtonGroup,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import Slider from "react-slick";
import "@fontsource/roboto";
export default function NFT(props) {
  const {
    images,
    name,
    createDate,
    bidders,
    download,
    currentbid,
    avatar,
    participants,
    totalUserJoin,
    exprirationDate,
  } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Card p="20px">
      {/* <Button
            position="absolute"
            bg="white"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => {
              setLike(!like);
            }}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={like ? IoHeart : IoHeartOutline}
              color="brand.500"
            />
          </Button> */}
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb="10px">
          <Image src={images} w={"100%"} h={"180px"} borderRadius="20px" />
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex
              direction="row"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontFamily="Roboto"
                color={textColor}
                fontSize={{
                  base: "lg",
                  md: "md",
                  lg: "md",
                  xl: "md",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              <Image
                mx="auto"
                src={avatar}
                h="35px"
                w="35px"
                borderRadius={"50%"}
              />
            </Flex>
            <Text
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              Ngày đăng: {createDate}
            </Text>
            <Text
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              Ngày hết hạn: {exprirationDate}
            </Text>
            <Text
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              Số tình nguyện viên: {participants}
            </Text>
            <Text
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              Số người tham gia: {totalUserJoin}
            </Text>
            {/* <AvatarGroup
              max={3}
              color={textColorBid}
              size="sm"
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize="12px"
            >
              {bidders.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup> */}
          </Flex>
          <Text
            fontFamily="Roboto"
            fontWeight="700"
            fontSize="sm"
            color={textColorBid}
          >
            {currentbid}
          </Text>
          <Flex
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            align="center"
            justify="space-between"
          >
            <Flex
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              flexDirection={"row"}
              align="center"
              justify="space-between"
            >
              <ButtonGroup variant="solid" spacing="3">
                <Button fontFamily="Roboto" size="sm" colorScheme="brandScheme">
                  Xem chi tiết
                </Button>
                <Button
                  fontFamily="Roboto"
                  size="sm"
                  backgroundColor="gray.700"
                  color="#fff"
                >
                  Khóa bài viết
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
