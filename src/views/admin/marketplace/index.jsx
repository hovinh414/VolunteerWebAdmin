import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  CircularProgress,
} from "@chakra-ui/react";

// Custom components
import NFT from "components/card/NFT";
import "@fontsource/roboto";
import axios from "axios";
export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [orgId, setOrgId] = useState(null);
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    const storedOrgResult = localStorage.getItem("result");
    const orgResult = JSON.parse(storedOrgResult);
    setOrgId(orgResult._id);
    setToken(accessToken);
  }, []);


  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString("en-GB");
    return formattedDate;
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/posts/${orgId}?page=${page}&limit=8`,
        config
      );

      if (response.data.status === "SUCCESS") {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.log("API Error get post:", error);
    } finally {
      setIsLoading(false);
    }
  }, [orgId, page, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}

      <Grid
        mb="20px"
        w={"100%"}
        gridTemplateColumns={{ xl: "repeat(1, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
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
                Danh sách bài viết
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  fontFamily="Roboto"
                  color={textColorBrand}
                  fontWeight="bold"
                  me={{ base: "34px", md: "44px" }}
                  to="#collectibles"
                >
                  Hoạt động tình nguyện
                </Link>
                <Link
                  fontFamily="Roboto"
                  color={textColorBrand}
                  fontWeight="bold"
                  to="#sports"
                >
                  Hoạt động gây quỹ
                </Link>
              </Flex>
            </Flex>
            {isLoading ? (
              <SimpleGrid gap="20px">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  h="300px"
                >
                  <CircularProgress isIndeterminate color={textColorBrand} />
                </Flex>
              </SimpleGrid>
            ) : (
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                  lg: 3,
                  xl: 4,
                }}
                gap="20px"
              >
                {posts.map((post, index) => (
                  <NFT
                    key={index}
                    post={post}
                    avatar={post.ownerAvatar}
                    name={post.ownerDisplayname}
                    createDate={formatDate(post.createdAt)}
                    images={post.media}
                    currentbid={
                      post.type === "activity" || post.type === "Activity"
                        ? "Hoạt động tình nguyện"
                        : "Hoạt động gây quỹ"
                    }
                    download="#"
                    participants={post.participants}
                    totalUserJoin={post.totalUserJoin}
                    exprirationDate={formatDate(post.exprirationDate)}
                  />
                ))}
              </SimpleGrid>
            )}
          </Flex>
        </Flex>
        {isLoading ? null : (
          <Flex mt="4" justifyContent="center" alignItems={"center"}>
            <Button onClick={handlePrevPage} disabled={page === 1} mr="4">
              {"<"}
            </Button>
            <Text fontFamily="Roboto" color={textColor}>{`Trang ${page}`}</Text>
            <Button onClick={handleNextPage} disabled={posts.length < 8} ml="4">
              {">"}
            </Button>
          </Flex>
        )}

        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='0.91 ETH'
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
