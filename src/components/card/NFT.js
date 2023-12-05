// Chakra imports
import {
  Button,
  Flex,
  ButtonGroup,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Icon,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/roboto";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
export default function NFT(props) {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        zIndex={2}
        onClick={onClick}
        pos="absolute"
        left="-25px"
        top="50%"
        transform="translateY(-50%)"
      >
        <Icon as={ChevronLeftIcon} width="25px" height="25px" color="inherit" />
      </Box>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        zIndex={2}
        onClick={onClick}
        pos="absolute"
        right="-25px"
        top="50%"
        transform="translateY(-50%)"
      >
        <Icon
          as={ChevronRightIcon}
          width="25px"
          height="25px"
          color="inherit"
        />
      </Box>
    );
  };
  const {
    images,
    name,
    createDate,
    currentbid,
    avatar,
    participants,
    totalUserJoin,
    exprirationDate,
    post,
  } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const settings = {
    infinite: true,
    dots: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <Card p="20px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Roboto">Chi tiết bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"row"} alignItems={"center"}>
              <Image
                mr={2}
                src={avatar}
                h="50px"
                w="50px"
                borderRadius={"50%"}
              />
              <Flex direction={"column"}>
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
                <Text
                  textAlign={"justify"}
                  fontFamily="Roboto"
                  color={textColor}
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {createDate}
                </Text>
              </Flex>
            </Flex>
            <Text
              mt={2}
              textAlign={"justify"}
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              {showFullContent ? post.content : `${post.content.slice(0, 200)}`}
              {post.content.length > 200 && (
                <Button
                  color="#FF0035"
                  fontSize="sm"
                  onClick={toggleShowFullContent}
                  _hover={{
                    backgroundColor: "#fff",
                  }}
                >
                  {showFullContent ? "...Ẩn đi" : "...Xem thêm"}
                </Button>
              )}
            </Text>
            <Slider {...settings}>
              {images.map((image, index) => (
                <Image
                  fit={"contain"}
                  key={index}
                  src={image}
                  w="100%"
                  h="280px"
                  borderRadius="20px"
                />
              ))}
            </Slider>
            <Flex mt={5} direction={"row"} justifyContent={"space-between"}>
              <Text
                fontFamily="Roboto"
                color={textColor}
                fontSize={{
                  base: "sm",
                }}
                fontWeight="800"
                me="14px"
              >
                Số tình nguyện viên: {totalUserJoin} / {participants}
              </Text>
            </Flex>
            <Text
              fontFamily="Roboto"
              color={textColor}
              fontSize={{
                base: "sm",
              }}
              fontWeight="700"
              me="14px"
            >
              Ngày hết hạn: {exprirationDate}.
            </Text>
            <Text
              fontFamily="Roboto"
              color={"#FF0035"}
              fontSize={{
                base: "md",
              }}
              fontWeight="700"
            >
              Địa chỉ: {post.address}.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              fontFamily="Roboto"
              size="sm"
              colorScheme="brandScheme"
              mr={3}
              onClick={onClose}
            >
              Đóng
            </Button>
            <Button
              fontFamily="Roboto"
              size="sm"
              backgroundColor="gray.700"
              color="#fff"
              variant="ghost"
              _hover={{
                backgroundColor: "gray.600",
              }}
            >
              Khóa bài viết
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex direction={{ base: "column" }} justify="center">
        <Slider {...settings}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              w="100%"
              h="180px"
              borderRadius="20px"
            />
          ))}
        </Slider>
        <Flex
          onClick={onOpen}
          mt="3"
          flexDirection="column"
          justify="space-between"
          h="100%"
        >
          <Flex
            justify="space-between"
            direction={{
              base: "column",
              md: "column",
              lg: "column",
              xl: "column",
            }}
            mb="auto"
          >
            <Flex mt={3} direction={"row"} alignItems={"center"}>
              <Image
                mr={2}
                src={avatar}
                h="35px"
                w="35px"
                borderRadius={"50%"}
              />
              <Flex direction={"column"} justifyContent={"center"}>
                <Text
                  fontFamily="Roboto"
                  color={textColor}
                  fontSize={15}
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  textAlign={"justify"}
                  fontFamily="Roboto"
                  color={textColor}
                  fontSize={{
                    base: "xs",
                  }}
                  fontWeight="bold"
                  me="14px"
                >
                  {createDate}
                </Text>
              </Flex>
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
            <Text
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="sm"
              color={textColorBid}
            >
              {currentbid}
            </Text>
          </Flex>

          <Flex
            direction={{
              base: "row",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            mt={3}
            align="center"
            justify="space-between"
          >
            <Button
              onClick={onOpen}
              fontFamily="Roboto"
              size="sm"
              colorScheme="brandScheme"
            >
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
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
