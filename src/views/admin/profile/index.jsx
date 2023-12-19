import { useState, useEffect, useCallback } from "react";
import { Box, SimpleGrid, Flex } from "@chakra-ui/react";
import ComplexTable from "views/admin/profile/components/ComplexTable";
import { columnsDataComplex } from "views/admin/profile/components/columnsData";
import tableDataComplex from "views/admin/profile/components/tableDataComplex.json";
import React from "react";
import axios from "axios";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
export default function Overview() {
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    const storedOrgResult = localStorage.getItem("result");
    setToken(accessToken);
  }, []);
  const searchPost = async (searchText) => {
    console.log(searchText);
    if (searchText.length === 0) {
      fetchData();
      return;
    }
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/search-user?text=" + searchText,
      });
      if (res.data.status === "SUCCESS") {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } 
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
        `http://localhost:3000/api/v1/users?page=${page}&limit=5`,
        config
      );

      if (response.data.status === "SUCCESS") {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log("API Error get user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, token]);
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
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex flexDirection={"row"} justifyContent={"flex-end"}>
        <SearchBar
          mb={{ base: "10px", md: "unset" }}
          me="10px"
          borderRadius="30px"
          searchPost={searchPost}
        />
      </Flex>
      <SimpleGrid
        mb="20px"
        width={{
          base: "125%",
          md: "150%",
          lg: "175%",
          xl: "200%",
        }}
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={users}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          numPage={page}
          isLoadingData={isLoading}
          fetchData={fetchData}
        />
      </SimpleGrid>
    </Box>
  );
}
