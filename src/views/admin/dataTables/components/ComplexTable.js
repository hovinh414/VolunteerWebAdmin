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
  Image,
  Checkbox,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PhoneIcon, EmailIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import Slider from "react-slick";
import { FaCheck, FaTimes } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/roboto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "components/LoadingOverlay";
import banner from "assets/img/auth/banner.png";
import { MdCheckCircle, MdCancel, MdBlock, MdEdit } from "react-icons/md";
// Assets
import { MdVisibility } from "react-icons/md";
export default function ColumnsTable(props) {
  const {
    columnsData,
    tableData,
    handleNextPage,
    handlePrevPage,
    numPage,
    isLoadingData,
  } = props;
  const textColorBid = useColorModeValue("brand.500", "white");
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [imageAuthenticate, setImageAuthenticate] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenOrg, setOpenOrg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [orgId, setOrgId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const [dataId, setDataId] = useState([]);
  const [orgDetail, setOrgDetail] = useState([]);
  const sortedData = dataId.sort((a, b) => a.column.order - b.column.order);
  useEffect(() => {
    const storedOrgResult = localStorage.getItem("result");
    const orgResult = JSON.parse(storedOrgResult);
    const token = localStorage.getItem("token");
    console.log(orgResult.type)
    const accessToken = JSON.parse(token);
    setToken(accessToken);
  }, []);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Adjust 'en-GB' to your desired locale
  };
  const handleActiveUser = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:3000/api/v1/org/active/" + orgId,
        headers: {
          Authorization: token,
        },
      });

      if (res.data.status === "SUCCESS") {
        toast.success("Kích hoạt tài khoản thành công!", {
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
      toast.error("Kích hoạt tài khoản thất bại!", {
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
      setOrgId("");
    }
  };
  // const getDetailUser = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios({
  //       method: "get",
  //       url: "http://localhost:3000/api/v1/org/65796124c6d87f13d37ba53a",
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     if (res.data.status === "SUCCESS") {
  //       setOrgDetail([...orgDetail, res.data.data]);
  //     }
  //     console.log(orgId)
  //   } catch (error) {
  //     toast.error("Xem chi tiết tài khoản thất bại!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.log(error.response);
  //   } finally {
  //     setLoading(false);
  //     setOpenOrg(true);
  //     setOrgId("");
  //   }
  // };
  const dataItem = dataId.find((item) => item.column.Header === "Thao tác");
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
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        zIndex={2}
        onClick={onClick}
        pos="absolute"
        left="-25px"
        top="50%"
        transform="translateY(-50%)"
      >
        <Icon as={ChevronLeftIcon} width="25px" height="25px" color="inherit" />
      </Box>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        zIndex={2}
        onClick={onClick}
        pos="absolute"
        right="-25px"
        top="50%"
        transform="translateY(-50%)"
      >
        <Icon
          as={ChevronRightIcon}
          width="25px"
          height="25px"
          color="inherit"
        />
      </Box>
    );
  };
  const settings = {
    infinite: true,
    dots: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
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
          setOrgId("");
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
              Bạn có chắc chắn muốn kích hoạt tài khoản này không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                fontFamily="Roboto"
                ref={cancelRef}
                onClick={() => {
                  setIsDialogOpen(false);
                  setOrgId("");
                }}
              >
                Hủy
              </Button>
              <Button
                fontFamily="Roboto"
                colorScheme="red"
                onClick={() => {
                  setIsDialogOpen(false);
                  setOpenOrg(false);
                  onClose();
                  handleActiveUser();
                }}
                ml={3}
              >
                Kích hoạt
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={isOpenOrg} onClose={() => setOpenOrg(false)}>
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
                ) : item.column.Header === "Ngày tạo" ? (
                  <Text
                    fontFamily="Roboto"
                    color={textColor}
                    fontSize={16}
                    fontWeight="bold"
                    mb={2}
                  >
                    Ngày tạo: {formatDate(item.value)}
                  </Text>
                ) : item.column.Header === "Minh chứng" ? (
                  <Box>
                    <Text
                      fontFamily="Roboto"
                      color={textColor}
                      fontSize={16}
                      fontWeight="bold"
                      mb={2}
                    >
                      Minh chứng:
                    </Text>
                    <Slider {...settings}>
                      {item.value.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          w="100%"
                          h="50%"
                          borderRadius="20px"
                        />
                      ))}
                    </Slider>
                  </Box>
                ) : null}
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            {dataItem ? (
              <Button
                fontFamily="Roboto"
                size="sm"
                mr={3}
                colorScheme="brandScheme"
                onClick={() => {
                  setIsDialogOpen(true);
                  setOrgId(dataItem.value);
                }}
              >
                Xác nhận
              </Button>
            ) : null}
            <Button
              fontFamily="Roboto"
              size="sm"
              backgroundColor="gray.700"
              color="#fff"
              variant="ghost"
              _hover={{
                backgroundColor: "gray.600",
              }}
              onClick={() => setOpenOrg(false)}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Roboto">Chi tiết minh chứng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Slider {...settings}>
              {imageAuthenticate.map((image, index) => (
                <Image
                  fit={"contain"}
                  key={index}
                  src={image}
                  w="100%"
                  h="100%"
                  borderRadius="20px"
                />
              ))}
            </Slider>
          </ModalBody>

          <ModalFooter>
            {dataItem ? (
              <Button
                fontFamily="Roboto"
                size="sm"
                mr={3}
                colorScheme="brandScheme"
                onClick={() => {
                  setIsDialogOpen(true);
                  setOrgId(dataItem.value);
                }}
              >
                Xác nhận
              </Button>
            ) : null}
            <Button
              fontFamily="Roboto"
              size="sm"
              backgroundColor="gray.700"
              color="#fff"
              variant="ghost"
              _hover={{
                backgroundColor: "gray.600",
              }}
              onClick={onClose}
            >
              Từ chối
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
          Tài khoản chờ xác nhận
        </Text>
        <Menu />
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

                  if (cell.column.Header === "Ảnh đại diện") {
                    data = (
                      <Flex
                        onClick={() => {
                          setDataId(row.cells);
                          setOpenOrg(true);
                        }}
                        justifyContent={"center"}
                      >
                        <Avatar w={"50px"} h={"50px"} src={cell.value} />
                      </Flex>
                    );
                  } else if (cell.column.Header === "Minh chứng") {
                    console.log(cell.value);
                    data = (
                      <Flex
                        onClick={() => {
                          setDataId(row.cells);
                          setImageAuthenticate(cell.value);
                          onOpen();
                        }}
                        align="center"
                      >
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
                          {cell.value.map((avt, key) => (
                            <Avatar w={"50px"} h={"50px"} key={key} src={avt} />
                          ))}
                        </AvatarGroup>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Tên tài khoản") {
                    data = (
                      <Flex
                        justifyContent={"center"}
                        onClick={() => {
                          setDataId(row.cells);
                          setOpenOrg(true);
                        }}
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
                  } else if (cell.column.Header === "Email") {
                    data = (
                      <Flex
                        onClick={() => {
                          setDataId(row.cells);
                          setOpenOrg(true);
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
                          setDataId(row.cells);
                          setOpenOrg(true);
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
                  } else if (cell.column.Header === "Ngày tạo") {
                    data = (
                      <Flex
                        onClick={() => {
                          setDataId(row.cells);
                          setOpenOrg(true);
                        }}
                        justifyContent={"center"}
                      >
                        <Text
                          fontFamily="Roboto"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {formatDate(cell.value)}
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
                            onClick={() => {
                              setIsDialogOpen(true);
                              setOrgId(cell.value);
                            }}
                          >
                            <Icon
                              as={FaCheck}
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
                              as={FaTimes}
                              width="20px"
                              height="20px"
                              color="inherit"
                            />
                          </Button>
                          <Button
                            fontFamily="Roboto"
                            size="sm"
                            backgroundColor="#2D99AE"
                            color="#fff"
                            _hover={{
                              backgroundColor: "#2D99AE",
                              textDecoration: "underline",
                            }}
                            onClick={() => {
                              setDataId(row.cells);
                              setOpenOrg(true);
                            }}
                          >
                            <Icon
                              as={MdVisibility}
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
