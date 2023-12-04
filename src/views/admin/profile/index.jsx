/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
// Custom components
import Banner from "views/admin/profile/components/Banner";

// Assets
import banner from "assets/img/auth/banner.png";

export default function Overview() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [type, setType] = useState("");
  const [follower, setFollower] = useState(0);
  useEffect(() => {
    const storedOrgResult = localStorage.getItem("orgResult");
    const orgResult = JSON.parse(storedOrgResult);
    setName(orgResult.fullname);
    setAvatar(orgResult.avatar);
    if (orgResult.type === "Organization") {
      setFollower(orgResult.follower)
      setType("Tổ chức");
    } else {
      setType("Quản trị viên");
    }
    
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} w={"100%"}>
      {/* Main Fields */}
      <Banner
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        avatar={avatar}
        name={name}
        job={type}
        posts="17"
        followers={follower}
        following="274"
      />
    </Box>
  );
}
