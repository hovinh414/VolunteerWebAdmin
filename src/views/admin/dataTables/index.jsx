import { Box, SimpleGrid } from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import Avatar5 from "assets/img/avatars/avatar5.png";
import Avatar6 from "assets/img/avatars/avatar6.png";
import Avatar7 from "assets/img/avatars/avatar7.png";
import Avatar8 from "assets/img/avatars/avatar8.png";
export default function Settings() {
  // Chakra Color Mode
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
          tableData={tableDataComplex}
          bidders={[
            Avatar1,
            Avatar2,
            Avatar3,
            Avatar4,
            Avatar5,
          ]}
        />
      </SimpleGrid>
    </Box>
  );
}
