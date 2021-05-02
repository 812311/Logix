import * as React from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  HStack,
  Icon,
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
import { atoms, Shipment, Status, Mode } from "../states";
import { useRecoilState } from "recoil";
import { AiOutlineEdit } from "react-icons/ai";
import api from "../utils/api";

interface Props {
  shipment: Shipment | undefined | null;
  onClose: any;
  isOpen: boolean;
}
export const EditShipmentModal = ({ shipment, onClose, isOpen }: Props) => {
  const [shipments, setShipments] = useRecoilState<any>(atoms.shipments);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const toast = useToast();
  const currentShipment = shipments?.find((ship: Shipment) => ship.shipmentId === shipment?.shipmentId);
  const [shipmentEdit, setShipmentEdit] = React.useState<Shipment | undefined>();

  React.useEffect(() => {
    setShipmentEdit(currentShipment);
    setIsEditing(false);
  }, [currentShipment]);

  async function onSave() {
    const res = await api.put(
      `shipments/${shipmentEdit?.shipmentId}`,
      {
        shipmentId: shipmentEdit?.shipmentId,
        clientName: shipmentEdit?.clientName,
        origin: shipmentEdit?.origin,
        destination: shipmentEdit?.destination,
        estimatedArrival: shipmentEdit?.estimatedArrival,
        estimatedDeparture: shipmentEdit?.estimatedDeparture,
        mode: shipmentEdit?.mode,
        status: shipmentEdit?.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      setIsEditing(false);
      setShipments(
      [...shipments?.filter((ship: Shipment) => ship?.shipmentId !== shipmentEdit?.shipmentId),
        shipmentEdit,
      ]);
      toast({
        title: "Shipment updated.",
        description: "Shipment information has been updated",
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
          {isEditing && "Edit"} Shipment Information
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="3rem">
            <Stack>
              <HStack>
                <Text fontSize="28px">Company Information</Text>
                <Spacer />
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon as={AiOutlineEdit} w={5} h={5} />
                </Button>
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Client Name</Text>
                  <Input
                    isDisabled={!isEditing}
                    value={shipmentEdit?.clientName}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
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
                    isDisabled={!isEditing}
                    value={shipmentEdit?.origin}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
                        origin: event.target.value,
                      })
                    }
                    placeholder="Street / Number / City / State / Country / Postal Code"
                  />
                </Box>
                <Box flex={1}>
                  <Text>Complete Address</Text>
                  <Input
                    isDisabled={!isEditing}
                    value={shipmentEdit?.destination}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
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
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon as={AiOutlineEdit} w={5} h={5} />
                </Button>
              </HStack>
              <HStack spacing="3rem">
                <Box flex={1}>
                  <Text>Estimated Departure</Text>
                  <Input
                    type="date"
                    isDisabled={!isEditing}
                    /*@ts-ignore*/
                    value={format(shipmentEdit?.estimatedDeparture ? new Date(shipmentEdit?.estimatedDeparture): new Date(),"yyyy-MM-dd")}
                    onChange={(event: any) => {
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
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
                    isDisabled={!isEditing}
                    /*@ts-ignore*/
                    value={format(shipmentEdit?.estimatedArrival ? new Date(shipmentEdit?.estimatedArrival): new Date(),"yyyy-MM-dd")}
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
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
                    isDisabled={!isEditing}
                    /*@ts-ignore*/
                    value={shipmentEdit?.mode}
                    placeholder="Select option"
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
                        mode: event.target.value,
                      })
                    }
                  >
                    {shipments
                      ?.map((s:Shipment) => s.mode)
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
                    isDisabled={!isEditing}
                    /*@ts-ignore*/
                    value={shipmentEdit?.status}
                    placeholder="Select option"
                    onChange={(event: any) =>
                      /*@ts-ignore*/
                      setShipmentEdit({
                        ...shipmentEdit,
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
            {isEditing ? "Cancel" : "Close"}
          </Button>
          {isEditing && (
            <Button marginLeft="1.5rem" onClick={onSave}>
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
