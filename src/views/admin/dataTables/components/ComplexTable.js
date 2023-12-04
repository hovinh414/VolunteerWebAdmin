import {
  Flex,
  Table,
  Progress,
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
  Image,
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

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import "@fontsource/roboto";
import avatar from "../../../../assets/img/avatars/avatar2.png";
// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
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
          Tài khoản chờ xác nhận
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
                    justify="space-between"
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
                  if (cell.column.Header === "Tên tổ chức") {
                    data = (
                      <Text
                        fontFamily="Roboto"
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Trạng thái") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Đã xác nhận"
                              ? "green.500"
                              : cell.value === "Từ chối"
                              ? "red.500"
                              : cell.value === "Chờ xác nhận"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Đã xác nhận"
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
                  } else if (cell.column.Header === "Ngày") {
                    data = (
                      <Text
                        fontFamily="Roboto"
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Minh chứng") {
                    console.log(cell.value);
                    data = (
                      <Flex align="center">
                        <AvatarGroup
                          max={3}
                          color={textColorBid}
                          size="sm"
                          mt={{
                            base: "0px",
                            md: "10px",
                            lg: "0px",
                            xl: "10px",
                            "2xl": "0px",
                          }}
                          fontSize="12px"
                        >
                          {bidders.map((avt, key) => (
                            <Avatar w={"50px"} h={"50px"} key={key} src={avt} />
                          ))}
                        </AvatarGroup>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Thao tác") {
                    data = (
                      <ButtonGroup variant="solid" spacing="3">
                        <Button
                          fontFamily="Roboto"
                          size="sm"
                          colorScheme="brandScheme"
                        >
                          Xác nhận
                        </Button>
                        <Button
                          fontFamily="Roboto"
                          size="sm"
                          backgroundColor="gray.500"
                          color="#fff"
                        >
                          Từ chối
                        </Button>
                      </ButtonGroup>
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
