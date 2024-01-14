import { Box, Center, CircularProgress, useColorModeValue } from "@chakra-ui/react";

const LoadingOverlay = ({ isLoadingOverlay }) => {
    const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <>
      {isLoadingOverlay && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)" // Dark overlay
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
        >
          <Center>
            <CircularProgress isIndeterminate color={textColorBrand} />
          </Center>
        </Box>
      )}
    </>
  );
};

export default LoadingOverlay;
