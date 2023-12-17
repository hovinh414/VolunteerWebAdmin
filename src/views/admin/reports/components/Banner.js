// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useRef, useState } from "react";
import "@fontsource/roboto";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import LoadingOverlay from "components/LoadingOverlay";
export default function Banner(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    id,
    img,
    orgAvt,
    userSendAvatar,
    orgFullname,
    userSendFullname,
    userSendPhone,
    dateReport,
    content,
    isLoadingData,
    token,
  } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
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
  const settings = {
    infinite: true,
    dots: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const cancelRef = useRef();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function convertToDDMMYYYY(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const handleSolveReport = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/api/v1/report",
        headers: {
          Authorization: token,
        },
        data: {
          reportId: id,
        },
      });

      if (res.data.status === "SUCCESS") {
        toast.success("Xác nhận thành công!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.fetchData();
      }
    } catch (error) {
      toast.error("Xác nhận thất bại!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card mb={{ base: "0px", lg: "20px" }}>
      <ToastContainer />
      <LoadingOverlay isLoadingOverlay={loading} />
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Roboto">Chi tiết bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Slider {...settings}>
              {img.map((image, index) => (
                <Image
                  fit={"contain"}
                  key={index}
                  src={image}
                  w="100%"
                  h="100%"
                  borderRadius="20px"
                />
              ))}
            </Slider>
            <Flex flexDirection={"column"} w="100%" mt={6}>
              <Text
                fontFamily="Roboto"
                color={textColorPrimary}
                fontWeight="bold"
                fontSize={17}
              >
                Nội dung báo cáo - Ngày {convertToDDMMYYYY(dateReport)} :
              </Text>
              <Text
                textAlign={"justify"}
                fontFamily="Roboto"
                fontSize={{
                  base: "md",
                }}
                fontWeight="400"
              >
                {content}
              </Text>
            </Flex>
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
              onClick={() => setIsDialogOpen(true)}
            >
              Giải quyết
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        onClose={() => {
          setIsDialogOpen(false);
        }}
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontFamily="Roboto"
              fontSize="lg"
              fontWeight="bold"
            >
              Xác nhận
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody fontFamily="Roboto">
              Bạn đã giải quyết vấn đề này?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                fontFamily="Roboto"
                ref={cancelRef}
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Hủy
              </Button>
              <Button
                fontFamily="Roboto"
                colorScheme="red"
                ml={3}
                onClick={() => {
                  onClose();
                  setIsDialogOpen(false);
                  handleSolveReport();
                }}
              >
                Xác nhận
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Text
        onClick={onOpen}
        fontFamily="Roboto"
        color={textColorPrimary}
        fontWeight="bold"
        mb={2}
        fontSize={16}
      >
        Hình ảnh báo cáo :
      </Text>
      <Slider onClick={onOpen} {...settings}>
        {img.map((image, index) => (
          <Image
            key={index}
            src={image}
            w="100%"
            h="200px"
            borderRadius="20px"
          />
        ))}
      </Slider>
      <Flex onClick={onOpen} flexDirection={"row"} alignItems={"center"} mt={3}>
        <Avatar
          src={orgAvt}
          h="75px"
          w="75px"
          border="4px solid"
          borderColor={borderColor}
        />
        <Flex ml={2} flexDirection={"column"}>
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="xl"
            mt="10px"
          >
            {orgFullname}
          </Text>
          <Text fontFamily="Roboto" color={textColorPrimary} fontSize="md">
            Tổ chức bị báo cáo
          </Text>
        </Flex>
      </Flex>
      <Flex onClick={onOpen} flexDirection={"row"} alignItems={"center"} mt={3}>
        <Avatar
          src={userSendAvatar}
          h="75px"
          w="75px"
          border="4px solid"
          borderColor={borderColor}
        />
        <Flex ml={2} flexDirection={"column"}>
          <Text
            fontFamily="Roboto"
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="xl"
            mt="10px"
          >
            {userSendFullname}
          </Text>
          <Text fontFamily="Roboto" color={textColorPrimary} fontSize="md">
            Người báo cáo - SĐT: {userSendPhone}
          </Text>
        </Flex>
      </Flex>
      <Flex onClick={onOpen} flexDirection={"column"} w="100%" mt="15px">
        <Text
          fontFamily="Roboto"
          color={textColorPrimary}
          fontWeight="bold"
          fontSize={16}
        >
          Nội dung báo cáo - Ngày {convertToDDMMYYYY(dateReport)} :
        </Text>
        <Text
          textAlign={"justify"}
          fontFamily="Roboto"
          fontSize={{
            base: "md",
          }}
          fontWeight="400"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW="100%"
          whiteSpace="nowrap"
        >
          {content}
        </Text>
      </Flex>
      <Button
        fontFamily="Roboto"
        size="md"
        colorScheme="brandScheme"
        mt={3}
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Giải quyết
      </Button>
    </Card>
  );
}
