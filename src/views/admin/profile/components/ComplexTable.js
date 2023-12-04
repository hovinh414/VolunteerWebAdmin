import {
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  ButtonGroup,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  MdBlock,
  MdEdit,
  MdHome,
  MdLock,
  MdOutlineSignpost,
} from "react-icons/md";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import "@fontsource/roboto";
// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function Usertables(props) {
  const { columnsData, tableData, bidders } = props;
  const textColorBid = useColorModeValue("brand.500", "white");
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [imageAuthenticate, setImageAuthenticate] = useState([]);
  useEffect(() => {
    const storedOrgResult = localStorage.getItem("orgResult");
    const orgResult = JSON.parse(storedOrgResult);
    setImageAuthenticate(orgResult.imageAuthenticate);
  }, []);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      width={"100%"}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          fontFamily="Roboto"
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Quản lý tài khoản
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  fontFamily="Roboto"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="center"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Ảnh đại diện") {
                    data = (
                      <Flex justifyContent={"center"}>
                        <Avatar w={"50px"} h={"50px"} src={cell.value} />
                      </Flex>
                    );
                  } else if (cell.column.Header === "Tên tổ chức") {
                    data = (
                      <Flex justifyContent={"center"}>
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Loại tài khoản") {
                    data = (
                      <Flex justifyContent={"center"}>
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Trạng thái") {
                    data = (
                      <Flex align="center" justifyContent={"center"}>
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Đã xác thực"
                              ? "green.500"
                              : cell.value === "Từ chối"
                              ? "red.500"
                              : cell.value === "Chờ xác nhận"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Đã xác thực"
                              ? MdCheckCircle
                              : cell.value === "Từ chối"
                              ? MdCancel
                              : cell.value === "Chờ xác nhận"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Ngày tạo") {
                    data = (
                      <Flex justifyContent={"center"}>
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Thao tác") {
                    data = (
                      <Flex justifyContent={"center"}>
                        <ButtonGroup variant="solid" spacing="3">
                          <Button
                            fontFamily="Roboto"
                            size="sm"
                            colorScheme="brandScheme"
                            hover={"Khóa tài khoản"}
                          >
                            <Icon
                              as={MdBlock}
                              width="20px"
                              height="20px"
                              color="inherit"
                            />
                          </Button>
                          <Button
                            fontFamily="Roboto"
                            size="sm"
                            backgroundColor="gray.800"
                            color="#fff"
                            _hover={{
                              backgroundColor: "gray.600",
                              textDecoration: "underline",
                            }}
                          >
                            <Icon
                              as={MdEdit}
                              width="20px"
                              height="20px"
                              color="inherit"
                            />
                          </Button>
                        </ButtonGroup>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
