import React, { useState, useCallback, useEffect } from "react";
import { Text, useColorModeValue, Flex } from "@chakra-ui/react";
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
import Card from "components/card/Card.js";
import ChatCard from "views/admin/chat/components/ChatCard";
import ChatScreen from "views/admin/chat/components/ChatScreen";
import axios from "axios";
import "@fontsource/roboto";
export default function ChatHistory(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.5)",
    "unset"
  );

  // State để theo dõi chat đang được chọn
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setToken(accessToken);
  }, []);
  // Hàm xử lý khi bấm vào ChatCard
  const handleChatClick = (name, avatar) => {
    setSelectedChat({ name, avatar });
  };
  const [chats, setChats] = useState([]);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/chat-admin/join`,
        config
      );

      if (response.data.status === "SUCCESS") {
        setChats(response.data.data);
      }
    } catch (error) {
      console.log("API Error get chat:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(chats);
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      width="100%"
      borderRadius="none"
    >
      <Card mb={{ base: "0px", "2xl": "20px" }} flex="1" borderRadius="none">
        {/* Render ChatCard instances */}
        {chats.map((item, index) => (
          <Flex key={index}>
            <ChatCard
              onClick={() =>
                handleChatClick(item.userfullname, item.useravatar)
              }
              boxShadow={
                selectedChat?.name === item.userfullname ? cardShadow : "unset"
              }
              mb="20px"
              image={item.useravatar}
              name={item.userfullname}
              // message={"Chào Thuận"}
            />
          </Flex>
        ))}
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
          boxShadow={
            selectedChat?.name === "Vladimir Putin" ? cardShadow : "unset"
          }
          mb="20px"
          image={Project3}
          name="Vladimir Putin"
          message={"Chào Thuận"}
        />
      </Card>
      <Card mb={{ base: "0px", "2xl": "20px" }} flex="2" borderRadius="none">
        {selectedChat && (
          <ChatScreen
            avatar={selectedChat.avatar}
            chatName={selectedChat.name}
          />
        )}
      </Card>
    </Flex>
  );
}
