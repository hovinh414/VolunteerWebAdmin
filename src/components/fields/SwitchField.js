// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";

export default function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    reversed,
    fontSize,
    ...rest
  } = props;
  let [checked, setChecked] = React.useState(isChecked);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box w="100%" fontWeight="500" {...rest}>
      {reversed ? (
        <Flex align="center" borderRadius="16px">
          {isChecked ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              isChecked={isChecked}
              variant="main"
              colorScheme="brandScheme"
              size="md"
            />
          )}
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" borderRadius="16px">
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              
            />
          )}
        </Flex>
      )}
    </Box>
  );
}
