// src/components/Header.tsx
import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";

const Header = () => {
  return (
    <Box p="3" style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
      <Flex align="center" justify="between">
        <Text size="5" weight="bold">Pasak Inflow Forecast</Text>
      </Flex>
    </Box>
  );
};

export default Header;
