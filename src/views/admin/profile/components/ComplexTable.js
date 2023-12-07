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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useMemo, useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdBlock, MdEdit } from "react-icons/md";
import { PhoneIcon, EmailIcon, ChevronDownIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/card/Card";
import MainMenu from "components/menu/MainMenu";
import "@fontsource/roboto";
import banner from "assets/img/auth/banner.png";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function Usertables(props) {
  const { columnsData, tableData, bidders } = props;
  const textColorBid = useColorModeValue("brand.500", "white");
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [imageAuthenticate, setImageAuthenticate] = useState([]);
  useEffect(() => {
    const storedOrgResult = localStorage.getItem("result");
    const orgResult = JSON.parse(storedOrgResult);
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

  const textColor = useColorModeValue("#2F3746", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [dataRow, setDataRow] = useState([]);
  const [role, setRole] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(dataRow);
  return (
    <Card
      direction="column"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      width={"100%"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Roboto">Thông tin tài khoản</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {dataRow.map((item, index) => (
              <Box key={index} mb={4}>
                {item.column.Header === "Ảnh đại diện" ? (
                  <Card
                    mb={{ base: "0px", lg: "20px" }}
                    w="100%"
                    h="100%"
                    align="center"
                  >
                    <Box
                      bg={`url(${banner})`}
                      bgPosition="center"
                      bgSize="cover"
                      bgRepeat="repeat"
                      borderRadius="16px"
                      h="200px"
                      w="100%"
                    />
                    <Avatar
                      mx="auto"
                      src={item.value}
                      h="120px"
                      w="120px"
                      mt="-60px"
                    />
                  </Card>
                ) : item.column.Header === "Tên tổ chức" ? (
                  <Flex justifyContent={"center"} mt="-25px">
                    <Text
                      fontFamily="Roboto"
                      color={textColor}
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {item.value}
                    </Text>
                  </Flex>
                ) : item.column.Header === "Trạng thái" ? (
                  <Flex align="center" justifyContent={"center"} mt="-18px">
                    <Icon
                      w="15px"
                      h="15px"
                      me="5px"
                      color={
                        item.value === "Đã xác thực"
                          ? "green.500"
                          : item.value === "Từ chối"
                          ? "red.500"
                          : item.value === "Chờ xác nhận"
                          ? "orange.500"
                          : null
                      }
                      as={
                        item.value === "Đã xác thực"
                          ? MdCheckCircle
                          : item.value === "Từ chối"
                          ? MdCancel
                          : item.value === "Chờ xác nhận"
                          ? MdOutlineError
                          : null
                      }
                    />
                    <Text
                      fontFamily="Roboto"
                      color={textColor}
                      fontSize="md"
                      fontWeight="700"
                    >
                      {item.value}
                    </Text>
                  </Flex>
                ) : item.column.Header === "Email" ? (
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      color={textColor}
                      fontWeight="bold"
                      fontFamily="Roboto"
                      type="email"
                      value={item.value}
                      placeholder="Email"
                    />
                  </InputGroup>
                ) : item.column.Header === "Phone" ? (
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <PhoneIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      color={textColor}
                      fontWeight="bold"
                      fontFamily="Roboto"
                      type="tel"
                      value={item.value}
                      placeholder="Số điện thoại"
                    />
                  </InputGroup>
                ) : item.column.Header === "Address" ? (
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaMapMarkerAlt} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      color={textColor}
                      fontWeight="bold"
                      fontFamily="Roboto"
                      type="text"
                      value={item.value}
                      placeholder="Địa chỉ"
                    />
                  </InputGroup>
                ) : item.column.Header === "Loại tài khoản" ? (
                  <Flex align="center">
                    <Text
                      fontFamily="Roboto"
                      color={textColor}
                      fontSize={16}
                      fontWeight="bold"
                      mr={2}
                    >
                      Loại tài khoản:
                    </Text>
                    <Menu>
                      <MenuButton
                        fontWeight="bold"
                        fontFamily="Roboto"
                        color={textColor}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {role ? role : item.value}
                      </MenuButton>
                      <MenuList zIndex={5}>
                        <MenuItem
                          color={textColor}
                          onClick={() => setRole("Siêu quản trị viên")}
                          fontFamily="Roboto"
                          fontWeight="bold"
                        >
                          Siêu quản trị viên
                        </MenuItem>
                        <MenuItem
                          color={textColor}
                          onClick={() => setRole("Quản trị viên")}
                          fontFamily="Roboto"
                          fontWeight="bold"
                        >
                          Quản trị viên
                        </MenuItem>
                        <MenuItem
                          color={textColor}
                          onClick={() => setRole("Tổ chức")}
                          fontFamily="Roboto"
                          fontWeight="bold"
                        >
                          Tổ chức
                        </MenuItem>
                        <MenuItem
                          color={textColor}
                          onClick={() => setRole("Cá nhân")}
                          fontFamily="Roboto"
                          fontWeight="bold"
                        >
                          Cá nhân
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : null}
              </Box>
            ))}
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
            >
              Cập nhật thông tin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.slice(0, 6).map((column, index) => (
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
              <Tr
                onClick={() => {
                  setRole("");
                  setDataRow(row.cells);
                  onOpen();
                }}
                {...row.getRowProps()}
                key={index}
              >
                {row.cells.slice(0, 6).map((cell, index) => {
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
