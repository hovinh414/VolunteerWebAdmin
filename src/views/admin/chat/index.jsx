import { Box, Grid } from "@chakra-ui/react";
import ChatHistory from "views/admin/chat/components/ChatHistory";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Chat() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <ChatHistory />
      </Grid>
    </Box>
  );
}
