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
  Checkbox,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import SwitchField from "components/fields/SwitchField";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { PhoneIcon, EmailIcon, ChevronDownIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/card/Card";
import axios from "axios";
import "@fontsource/roboto";
import banner from "assets/img/auth/banner.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "components/LoadingOverlay";
// Assets
import { MdCheckCircle, MdCancel, MdBlock, MdEdit } from "react-icons/md";
export default function Usertables(props) {
  const textColorBrand = useColorModeValue("brand.500", "white");
  const {
    columnsData,
    tableData,
    bidders,
    handleNextPage,
    handlePrevPage,
    numPage,
    isLoadingData,
  } = props;
  const textColorBid = useColorModeValue("brand.500", "white");
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const cancelRef = useRef();

  useEffect(() => {
    const storedOrgResult = localStorage.getItem("result");
    const orgResult = JSON.parse(storedOrgResult);
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setToken(accessToken);
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
  const sortedData = dataRow.sort((a, b) => a.column.order - b.column.order);
  const dataItem = dataRow.find((item) => item.column.Header === "Thao tác");
  useEffect(() => {
    if (dataItem) {
      setUserId(dataItem.value);
    } else {
      return;
    }
  }, [dataItem]);
  const handleBanUser = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:3000/api/v1/user/ban/" + userId,
        headers: {
          Authorization: token,
        },
      });

      if (res.data.status === "SUCCESS") {
        toast.success("Khóa tài khoản thành công!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.fetchData();
      }
    } catch (error) {
      toast.error("Khóa tài khoản thất bại!", {
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
    } finally {
      setLoading(false);
      setUserId("");
    }
  };
  return (
    <Card
      direction="column"
      px="0px"
      mt={5}
      overflowX={{ sm: "scroll", lg: "hidden" }}
      width={"100%"}
    >
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setIsDialogOpen(false);
          setUserId("");
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontFamily="Roboto"
              fontSize="lg"
              fontWeight="bold"
            >
              Xác nhận
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody fontFamily="Roboto">
              Bạn có chắc chắn muốn khóa tài khoản này không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                fontFamily="Roboto"
                ref={cancelRef}
                onClick={() => {
                  setIsDialogOpen(false);
                  setUserId("");
                }}
              >
                Hủy
              </Button>
              <Button
                fontFamily="Roboto"
                colorScheme="red"
                onClick={() => {
                  setIsDialogOpen(false);
                  handleBanUser();
                }}
                ml={3}
              >
                Khóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Roboto">Thông tin tài khoản</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {sortedData.map((item, index) => (
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
                ) : item.column.Header === "Tên tài khoản" ? (
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
                      color={item.value ? "green.500" : "red.500"}
                      as={item.value ? MdCheckCircle : MdCancel}
                    />
                    <Text
                      fontFamily="Roboto"
                      color={textColor}
                      fontSize="md"
                      fontWeight="700"
                    >
                      {item.value ? "Đã xác thực" : "Chưa xác thực"}
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
                ) : item.column.Header === "Số điện thoại" ? (
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
                ) : item.column.Header === "Địa chỉ" ? (
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
                        {role
                          ? role
                          : item.value === "User"
                          ? "Cá nhân"
                          : item.value === "Organization"
                          ? "Tổ chức"
                          : item.value === "Super Admin"
                          ? "Siêu quản trị viên"
                          : "Quản trị viên"}
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
              {headerGroup.headers.slice(0, 7).map((column, index) => (
                <Th
                  fontFamily="Roboto"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
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
                {row.cells.slice(0, 7).map((cell, index) => {
                  let data = "";

                  if (cell.column.Header === "Trạng thái") {
                    data = (
                      <Flex justifyContent={"center"}>
                        {cell.value ? (
                          <SwitchField
                            isChecked={cell.value}
                            reversed={true}
                            fontSize="sm"
                            id="3"
                            onChange={() => {
                              setIsDialogOpen(true);
                              setDataRow(row.cells);
                            }}
                          />
                        ) : (
                          <SwitchField
                            isChecked={cell.value}
                            reversed={true}
                            fontSize="sm"
                            id="3"
                          />
                        )}
                      </Flex>
                    );
                  } else if (cell.column.Header === "Ảnh đại diện") {
                    data = (
                      <Flex
                        onClick={() => {
                          setRole("");
                          setDataRow(row.cells);
                          onOpen();
                        }}
                        justifyContent={"center"}
                      >
                        <Avatar w={"50px"} h={"50px"} src={cell.value} />
                      </Flex>
                    );
                  } else if (cell.column.Header === "Tên tài khoản") {
                    data = (
                      <Flex
                        onClick={() => {
                          setRole("");
                          setDataRow(row.cells);
                          onOpen();
                        }}
                        justifyContent={"center"}
                      >
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
                      <Flex
                        onClick={() => {
                          setRole("");
                          setDataRow(row.cells);
                          onOpen();
                        }}
                        justifyContent={"center"}
                      >
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value === "User"
                            ? "Cá nhân"
                            : cell.value === "Organization"
                            ? "Tổ chức"
                            : cell.value === "Super Admin"
                            ? "Siêu quản trị viên"
                            : "Quản trị viên"}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Email") {
                    data = (
                      <Flex
                        onClick={() => {
                          setRole("");
                          setDataRow(row.cells);
                          onOpen();
                        }}
                        justifyContent={"center"}
                      >
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
                  } else if (cell.column.Header === "Số điện thoại") {
                    data = (
                      <Flex
                        onClick={() => {
                          setRole("");
                          setDataRow(row.cells);
                          onOpen();
                        }}
                        justifyContent={"center"}
                      >
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
                            onClick={() => {
                              setIsDialogOpen(true);
                              setUserId(cell.value);
                            }}
                          >
                            <Icon
                              as={MdBlock}
                              width="20px"
                              height="20px"
                              color="inherit"
                            />
                          </Button>
                          <Button
                            onClick={() => {
                              setRole("");
                              setDataRow(row.cells);
                              onOpen();
                            }}
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
      <ToastContainer />
      <Flex mt="4" justifyContent="center" alignItems={"center"}>
        <Button onClick={handlePrevPage} disabled={numPage === 1} mr="4">
          {"<"}
        </Button>
        <Text fontFamily="Roboto" color={textColor}>{`Trang ${numPage}`}</Text>
        <Button onClick={handleNextPage} disabled={tableData.length < 5} ml="4">
          {">"}
        </Button>
      </Flex>
      <LoadingOverlay isLoadingOverlay={loading} />
      <LoadingOverlay isLoadingOverlay={isLoadingData} />
    </Card>
  );
}
