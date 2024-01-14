import {
  Box,
  Grid,
  Flex,
  Text,
  Link,
  useColorModeValue,
  SimpleGrid,
  CircularProgress,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/reports/components/Banner";
import General from "views/admin/reports/components/General";
import Notifications from "views/admin/reports/components/Notifications";
import Projects from "views/admin/reports/components/Projects";
import Storage from "views/admin/reports/components/Storage";
import Upload from "views/admin/reports/components/Upload";
import axios from "axios";
// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React, { useState, useEffect, useCallback } from "react";
import LoadingOverlay from "components/LoadingOverlay";
import { ToastContainer, toast } from "react-toastify";
export default function Reports() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [solve, setSolve] = useState(true);
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setToken(accessToken);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/api/v1/reports",
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
        data: {
          solve: solve,
        },
      });

      if (res.data.status === "SUCCESS") {
        setReports(res.data.data);
        console.log(reports);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  }, [solve, token]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ToastContainer />
      {/* Main Fields */}
      <LoadingOverlay LoadingOverlay={isLoading} />
      <Flex
        mt="45px"
        mb="20px"
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
      >
        <Text
          fontFamily="Roboto"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
        >
          Danh sách báo cáo tài khoản
        </Text>
        <Flex
          align="center"
          me="20px"
          ms={{ base: "24px", md: "0px" }}
          mt={{ base: "20px", md: "0px" }}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p={1.5}
            mr={3}
            borderRadius={15}
            borderWidth={3}
            borderColor={solve ? "#F4F7FE" : textColorBrand}
          >
            <Link
              fontFamily="Roboto"
              color={textColorBrand}
              fontWeight="bold"
              to="#collectibles"
              onClick={() => setSolve(false)}
            >
              Chưa giải quyết
            </Link>
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p={1.5}
            mr={3}
            borderRadius={15}
            borderWidth={3}
            borderColor={!solve ? "#F4F7FE" : textColorBrand}
          >
            <Link
              fontFamily="Roboto"
              color={textColorBrand}
              fontWeight="bold"
              to="#collectibles"
              onClick={() => setSolve(true)}
            >
              Đã giải quyết
            </Link>
          </Flex>
        </Flex>
      </Flex>
      {isLoading ? (
        <SimpleGrid gap="20px">
          <Flex justifyContent="center" alignItems="center" w="100%" h="300px">
            <CircularProgress isIndeterminate color={textColorBrand} />
          </Flex>
        </SimpleGrid>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1fr 1fr 1fr",
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          {reports.map((report, index) => (
            <Banner
              key={index}
              id={report._id}
              img={report.img}
              orgAvt={report.orgAvt}
              userSendAvatar={report.userSendAvatar}
              orgFullname={report.orgFullname}
              userSendFullname={report.userSendFullname}
              userSendPhone={report.userSendPhone}
              dateReport={report.dateReport}
              content={report.content}
              token={token}
              fetchData={fetchData}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}
