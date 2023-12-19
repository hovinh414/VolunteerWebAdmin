import React from "react";
import {
  Text,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import "@fontsource/roboto";

const ChatScreen = ({ chatName, avatar }) => {
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.5)",
    "unset"
  );
  function convertTimeToHHMM(timeString) {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Chuyển đổi sang định dạng hh:mm
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return formattedTime;
  }
  const messages = [
    {
      id: 1,
      message: "Chào bạn! Bạn có cần giúp đỡ gì không?",
      time: "2023-01-20T10:30:00Z",
      avatar: "url/to/avatar1.jpg",
      sender: "me", // 'me' đại diện cho người gửi
    },
    {
      id: 2,
      message: "Không, cảm ơn! Mình đang xem xét ứng dụng chat.",
      time: "2023-01-20T10:35:00Z",
      avatar: "url/to/avatar2.jpg",
      sender: "other", // 'other' đại diện cho đối phương
    },
    {
      id: 3,
      message: "Đó là ý tưởng tuyệt vời. Bạn cần thêm thông tin gì không?",
      time: "2023-01-20T10:40:00Z",
      avatar: "url/to/avatar3.jpg",
      sender: "me",
    },
    // Thêm các tin nhắn khác tại đây
  ];
  return (
    <Box
      p="4"
      mb="20px"
      flex={1}
      flexDirection="column"
      justifyContent="flex-end"
      boxShadow={cardShadow}
      borderRadius={"25px"}
      display="flex"
    >
      <Flex p={2} flexDirection={"row"} alignItems={"center"} mb={2}>
        <Avatar h="60px" w="60px" src={avatar} me="20px" />
        <Text fontFamily="Roboto" fontWeight="bold" fontSize="30px">
          {chatName}
        </Text>
      </Flex>
      <Flex flexDirection={"column"}>
        {messages.map((item, index) => (
          <Flex
            justifyContent={item.sender === "me" ? "flex-end" : "flex-start"}
            alignItems={"center"}
            mb={2.5}
          >
            {item.sender === "me" ? (
              <>
                {" "}
                <Flex
                  key={index}
                  p="2"
                  pr={3}
                  borderRadius="8px"
                  flexDirection={"column"}
                  alignItems={"flex-end"}
                  bg={item.sender === "me" ? "red.500" : "gray.300"}
                  color={item.sender === "me" ? "white" : "black"}
                >
                  <Text fontFamily="Roboto">{item.message}</Text>
                  <Text fontFamily="Roboto">
                    {convertTimeToHHMM(item.time)}
                  </Text>
                </Flex>
                <Avatar h="30px" w="30px" src={avatar} ml={3} />
              </>
            ) : (
              <>
                <Avatar h="30px" w="30px" src={avatar} mr={3} />
                <Flex
                  key={index}
                  p="2"
                  pl={3}
                  borderRadius="8px"
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  bg={item.sender === "me" ? "red.500" : "gray.300"}
                  color={item.sender === "me" ? "white" : "black"}
                >
                  <Text fontFamily="Roboto">{item.message}</Text>
                  <Text fontFamily="Roboto">
                    {convertTimeToHHMM(item.time)}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        ))}
      </Flex>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <InputGroup mt="auto">
          <Input
            focusBorderColor="red.500"
            fontFamily="Roboto"
            placeholder="Nhập nội dung..."
            borderRadius="25px"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              aria-label="Send Message"
              icon={<IoSend />} // Replace IoSend with the desired icon
              colorScheme="red"
              onClick={() => console.log("Send Message")}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default ChatScreen;
