import * as React from "react";
import { Button, HStack } from "@chakra-ui/react";
export const Pagination = () => {
  return (
    <HStack paddingTop="2rem">
      <Button>Prev</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>Next</Button>
    </HStack>
  );
};
