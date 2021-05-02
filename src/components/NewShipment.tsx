import * as React from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { atoms, Mode, Shipment, Status } from "../states";
import { useRecoilState } from "recoil";
import {v4 as uuidv4} from 'uuid'
import api from "../utils/api";

interface Props {
  onClose: any;
  isOpen: boolean;
}
export const NewShipmentModal = ({ onClose, isOpen }: Props) => {
  const [shipments, setShipments] = useRecoilState<any>(atoms.shipments);
  const toast = useToast();
  
  const [shipmentNew, setShipmentNew] = React.useState<
    Shipment | undefined | null
  >();

  async function onSave() {
    const res = await api.post(
      "shipments",
      {
        shipmentId: uuidv4(),
        clientName: shipmentNew?.clientName,
        origin: shipmentNew?.origin,
        destination: shipmentNew?.destination,
        estimatedArrival: shipmentNew?.estimatedArrival,
        estimatedDeparture: shipmentNew?.estimatedDeparture,
        mode: shipmentNew?.mode,
        status: shipmentNew?.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      setShipments([
        ...shipments,
        {
          ...shipmentNew,
          estimatedDepartureDate: new Date(shipmentNew?.estimatedDeparture??''),
          estimatedArrivalDate: new Date(shipmentNew?.estimatedArrival??''),
        },
      ]);
      setShipmentNew(null);
      toast({
        title: "Shipment Created.",
        description: "Shipment information has been created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="32px">
          Add New Shipment Information
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="3rem">
            <Stack>
              <HStack>
                <Text fontSize="28px">Company Information</Text>
                <Spacer />
              
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Client Name</Text>
                  <Input
                    value={shipmentNew?.clientName}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        clientName: event.target.value,
                      })
                    }
                    placeholder="Client Name"
                  />
                </Box>
                <Spacer />
              </HStack>
            </Stack>
            <Stack spacing="1rem">
              <HStack spacing="3rem">
                <Text flex={1} fontSize="28px">
                  Origin Information
                </Text>
                <Text flex={1} fontSize="28px">
                  Destination Information
                </Text>
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Complete Address</Text>
                  <Input
                    value={shipmentNew?.origin}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        origin: event.target.value,
                      })
                    }
                    placeholder="Street / Number / City / State / Country / Postal Code"
                  />
                </Box>
                <Box flex={1}>
                  <Text>Complete Address</Text>
                  <Input
                    value={shipmentNew?.destination}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        destination: event.target.value,
                      })
                    }
                    placeholder="Street / Number / City / State / Country / Postal Code"
                  />
                </Box>
              </HStack>
            </Stack>
            <Stack spacing="1rem">
              <HStack>
                <Text fontSize="28px">Shipment Information</Text>
                <Spacer />
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Estimated Departure</Text>
                  <Input
                    type="date"
                    /*@ts-ignore*/
                    value={format(shipmentNew?.estimatedDeparture ? new Date(shipmentNew?.estimatedDeparture): new Date(),"yyyy-MM-dd")}
                    onChange={(event: any) => {
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        estimatedDeparture: event.target.value,
                      });
                    }}
                    placeholder="Date Departure"
                  />
                </Box>
                <Box flex={1}>
                  <Text>Estimated Arrival</Text>
                  <Input
                    type="date"
                    /*@ts-ignore*/
                    value={format(shipmentNew?.estimatedDeparture ? new Date(shipmentNew?.estimatedArrival): new Date(),"yyyy-MM-dd")}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        estimatedArrival: event.target.value,
                      })
                    }
                    placeholder="Date Arrival"
                  />
                </Box>
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Mode</Text>
                  <Select
                    /*@ts-ignore*/
                    value={shipmentNew?.mode}
                    placeholder="Select option"
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        mode: event.target.value,
                      })
                    }
                  >
                    {shipments
                      ?.map((s: Shipment) => s.mode)
                      ?.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i)
                      ?.sort()
                      ?.map((mode: Mode) => (
                        <option key={mode} value={mode?.toString()}>
                          {mode}
                        </option>
                      ))}
                  </Select>
                </Box>
                <Box flex={1}>
                  <Text>Status</Text>
                  <Select
                    /*@ts-ignore*/
                    value={shipmentNew?.status}
                    placeholder="Select option"
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentNew({
                        ...shipmentNew,
                        status: event.target.value,
                      })
                    }
                  >
                    {shipments
                      ?.map((s: Shipment) => s.status)
                      ?.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i)
                      ?.sort()
                      ?.map((status: Status) => (
                        <option key={status} value={status?.toString()}>
                          {status}
                        </option>
                      ))}
                  </Select>
                </Box>
              </HStack>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
           Cancel
          </Button>
         
            <Button marginLeft="1.5rem" onClick={onSave}>
              Add
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
