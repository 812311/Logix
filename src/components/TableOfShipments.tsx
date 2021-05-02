import * as React from "react";
import {
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Button,
  useDisclosure,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { atoms, Shipment } from "../states";
import { sortBy as SortByFunction } from "../utils/functionsUtils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EditShipmentModal } from "./EditShipment";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

interface Props {
  shipmentsProps: Shipment[] | undefined;
  filtersProps: any[];
}

export const TableOfShipments = ({ shipmentsProps, filtersProps }: Props) => {
  const [shipmentState, setShipmentState] = React.useState<Shipment>();
  const [sortBy, setSortBy] = useRecoilState<any>(atoms.headersTable);
  const setShipmentsData = useSetRecoilState(atoms.shipments);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  function handleEditShipment(ship: Shipment) {
    setShipmentState(ship);
    onEditOpen();
  }

  function sortTable(sort: string) {
    const newOrdenation: any = [];
    setShipmentsData(
      [...(shipmentsProps ?? [])]?.sort(SortByFunction(sort, sortBy[sort]))
    );
    Object.keys(sortBy).forEach(function (key) {
      if (key !== sort) {
        newOrdenation[key] = "asc";
      } else if (key === sort) {
        newOrdenation[key] = sortBy[key] === "asc" ? "desc" : "asc";
      }
    });
    setSortBy(newOrdenation);
  }

  function filterTable(shipments: Shipment[]) {
    let newArray: Shipment[] = shipments.slice();

    Object.keys(filtersProps)?.forEach(function (key: any) {
      if (filtersProps[key] !== "") {
        newArray = newArray?.filter((f: any) => f[key] === filtersProps[key]);
      }
    });

    return newArray;
  }

  return (
    <>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th onClick={() => sortTable("clientName")}>
              <HStack>
                <Text>Client Name</Text>
                <Icon
                  as={sortBy["clientName"] === "desc" ? HiArrowDown : HiArrowUp}
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("origin")}>
              <HStack>
                <Text>Origin</Text>
                <Icon
                  as={sortBy["origin"] === "desc" ? HiArrowDown : HiArrowUp}
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("destination")}>
              <HStack>
                <Text>Destination</Text>
                <Icon
                  as={
                    sortBy["destination"] === "desc" ? HiArrowDown : HiArrowUp
                  }
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("mode")}>
              <HStack>
                <Text>Mode</Text>
                <Icon
                  as={sortBy["mode"] === "desc" ? HiArrowDown : HiArrowUp}
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("estimatedDepartureDate")}>
              <HStack>
                <Text>Estimated Departure</Text>
                <Icon
                  as={
                    sortBy["estimatedDepartureDate"] === "desc"
                      ? HiArrowDown
                      : HiArrowUp
                  }
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("estimatedArrivalDate")}>
              <HStack>
                <Text>Estimated Arrival</Text>
                <Icon
                  as={
                    sortBy["estimatedArrivalDate"] === "desc"
                      ? HiArrowDown
                      : HiArrowUp
                  }
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th onClick={() => sortTable("status")}>
              <HStack>
                <Text>Status</Text>
                <Icon
                  as={sortBy["status"] === "desc" ? HiArrowDown : HiArrowUp}
                  w={3}
                  h={3}
                />
              </HStack>
            </Th>
            <Th>Edit Shipment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filterTable(shipmentsProps ?? [])?.map(
            (shipment: Shipment, index: number) => (
              <Tr key={`${shipment.shipmentId}${shipment.clientName}`}>
                <Td>{shipment.clientName}</Td>
                <Td>{shipment.origin}</Td>
                <Td>{shipment.destination}</Td>
                <Td>{shipment.mode}</Td>
                <Td>{shipment.estimatedDepartureDate.toDateString()}</Td>
                <Td>{shipment.estimatedArrivalDate.toDateString()}</Td>
                <Td>{shipment.status}</Td>
                <Td isNumeric>
                  <Button
                    size="sm"
                    variant={index % 2 === 0 ? "solid" : "outline"}
                    border="1px solid"
                    borderColor={index % 2 === 0 ? "gray.400" : "gray.300"}
                    onClick={() => handleEditShipment(shipment)}
                  >
                    Details
                  </Button>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
      <EditShipmentModal
        shipment={shipmentState}
        onClose={onEditClose}
        isOpen={isEditOpen}
      />
    </>
  );
};
