/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
// Custom components
import axios from "axios";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import "@fontsource/roboto";
function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warning("Nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/api/v1/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        data: {
          username,
          password,
        },
      });

      if (res.data.status === "SUCCESS") {
        console.log(res.data.data.orgResult);

        // if (res.data.data.orgResult.type === "Admin") {
        localStorage.setItem(
          "orgResult",
          JSON.stringify(res.data.data.orgResult)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.data.refreshToken)
        );
        toast.success("Hi👋 " + res.data.data.orgResult.fullname, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push("/admin/default");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại!", {
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
    }
  };
  const history = useHistory();

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading
            fontFamily="Roboto"
            color={textColor}
            fontSize="36px"
            mb="10px"
          >
            Đăng nhập
          </Heading>
          <Text
            fontFamily="Roboto"
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Nhập tài khoản và mật khẩu để đăng nhập!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            fontFamily="Roboto"
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Đăng nhập với google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text fontFamily="Roboto" color="gray.400" mx="14px">
              hoặc
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              fontFamily="Roboto"
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Tài khoản<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              fontFamily="Roboto"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="tài khoản"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(event) => {
                const newUsername = event.target.value;
                setUsername(newUsername);
              }}
            />
            <FormLabel
              fontFamily="Roboto"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Mật khẩu<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                fontFamily="Roboto"
                isRequired={true}
                fontSize="sm"
                placeholder="Mật khẩu bao gồm 8 ký tự, chữ in hoa và chữ số"
                mb="24px"
                size="lg"
                type={show ? "password" : "text"}
                variant="auth"
                onChange={(event) => {
                  const newPass = event.target.value;
                  setPassword(newPass);
                }}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              fontFamily="Roboto"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          ></Flex>
        </Flex>
      </Flex>
      <ToastContainer />
    </DefaultAuth>
  );
}

export default SignIn;
