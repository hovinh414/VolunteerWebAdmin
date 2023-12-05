import { Box, SimpleGrid } from "@chakra-ui/react";
import ComplexTable from "views/admin/profile/components/ComplexTable";
import { columnsDataComplex } from "views/admin/profile/components/columnsData";
import tableDataComplex from "views/admin/profile/components/tableDataComplex.json";
import React from "react";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

export default function Overview() {
  const users = [
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/bhx-clone.appspot.com/o/avatars%2F651d0055a528879d9d06ce27%2Fhienmau123651d0055a528879d9d06ce278197?alt=media",
      status: "Đã xác thực",
      name: "Hiến máu nhân đạo",
      date: "24/11/2023",
      role: "Tổ chức",
      email: "hienmau123@gmail.com",
      phone: "0967626483",
      address:
        "355 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
    },
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/bhx-clone.appspot.com/o/avatars%2F6544e7c4084e4b75ef3d365e%2Ftinhnguyen1236544e7c4084e4b75ef3d365e1972?alt=media",
      status: "Đã xác thực",
      name: "Sài Gòn Xanh",

      date: "11/11/2023",
      role: "Tổ chức",
      email: "saigonxanh@gmail.com",
      phone: "0967441256",
      address: "3441 Phạm Thế Hiển, Phường 7, Quận 8, Thành phố Hồ Chí Minh",
    },
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/bhx-clone.appspot.com/o/avatars%2F6523fc90d176717dd38932b2%2Fhutech1236523fc90d176717dd38932b27591?alt=media",
      name: "Thiện Nguyện Hutech Khu B",
      status: "Đã xác thực",
      date: "05/01/2023",
      role: "Tổ chức",
      email: "hutech123@gmail.com",
      phone: "0315489447",
      address:
        "475B Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
    },
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/bhx-clone.appspot.com/o/avatars%2F654c7328d5b88526dddf28e0%2Fthuan123654c7328d5b88526dddf28e07423?alt=media",
      name: "Nguyễn Thanh Thuận",
      status: "Đã xác thực",
      date: "12/07/2023",
      role: "Cá nhân",
      email: "thuan123@gmail.com",
      phone: "0383138060",
      address:
        "25/27 Đường 6, Phường Tăng Nhơn Phú B, Quận 9, Thành phố Hồ Chí Minh",
    },
  ];
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
          bidders={[Avatar1, Avatar2, Avatar3, Avatar4, Avatar1]}
        />
      </SimpleGrid>
    </Box>
  );
}
