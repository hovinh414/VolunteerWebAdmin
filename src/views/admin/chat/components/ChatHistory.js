import React, { useState } from "react";
import { Text, useColorModeValue, Flex } from "@chakra-ui/react";
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
import Card from "components/card/Card.js";
import ChatCard from "views/admin/chat/components/ChatCard";
import ChatScreen from "views/admin/chat/components/ChatScreen";
import "@fontsource/roboto";
export default function ChatHistory(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.5)",
    "unset"
  );

  // State để theo dõi chat đang được chọn
  const [selectedChat, setSelectedChat] = useState(null);
  // Hàm xử lý khi bấm vào ChatCard
  const handleChatClick = (name, avatar) => {
    setSelectedChat({ name, avatar });
  };

  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      width="100%"
      borderRadius="none"
    >
      <Card mb={{ base: "0px", "2xl": "20px" }} flex="1" borderRadius="none">
        {/* Render ChatCard instances */}
        <ChatCard
          onClick={() => handleChatClick("Maria", Project1)}
          boxShadow={selectedChat?.name === "Maria" ? cardShadow : "unset"}
          mb="20px"
          image={Project1}
          name="Maria"
          message={"Chào Thuận"}
        />
        <ChatCard
          onClick={() => handleChatClick("John", Project2)}
          boxShadow={selectedChat?.name === "John" ? cardShadow : "unset"}
          mb="20px"
          image={Project2}
          name="John"
          message={"Chào Thuận"}
        />
        <ChatCard
          onClick={() => handleChatClick("Kha Phan", Project3)}
          boxShadow={selectedChat?.name === "Kha Phan" ? cardShadow : "unset"}
          image={Project3}
          mb="20px"
          name="Kha Phan"
          message={"Chào Thuận"}
        />
        <ChatCard
          onClick={() => handleChatClick("Joe Bidan", Project2)}
          boxShadow={selectedChat?.name === "Joe Bidan" ? cardShadow : "unset"}
          mb="20px"
          image={Project2}
          name="Joe Bidan"
          message={"Chào Thuận"}
        />
        <ChatCard
          onClick={() => handleChatClick("Vladimir Putin", Project3)}
          boxShadow={selectedChat?.name === "Vladimir Putin" ? cardShadow : "unset"}
          mb="20px"
          image={Project3}
          name="Vladimir Putin"
          message={"Chào Thuận"}
        />
      </Card>
      <Card mb={{ base: "0px", "2xl": "20px" }} flex="2" borderRadius="none">
        {selectedChat && <ChatScreen avatar={selectedChat.avatar} chatName={selectedChat.name} />}
      </Card>
    </Flex>
  );
}
