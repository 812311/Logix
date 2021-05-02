import * as React from "react";
import { Text, VStack, HStack, Button, Box, Select, useDisclosure } from "@chakra-ui/react";
import { atoms, Shipment } from "../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TableOfShipments } from "./TableOfShipments";
import { Pagination } from "./Pagination";
import api from "../utils/api";
import { NewShipmentModal } from "./NewShipment";

export const DashBoard = () => {
  const [shipments, setShipments] = useRecoilState(atoms.shipments);
  const setOrder = useSetRecoilState<any>(atoms.headersTable);
  const [filters, setFilters] = React.useState<any[]>([]);
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNewClose,
  } = useDisclosure();
  
  React.useEffect(() => {
    async function loadProducts() {
      const res = await api.get("shipments");
      if (res.data) {
        const data = res.data.map((shipment: Shipment) => ({
          ...shipment,
          estimatedDepartureDate: new Date(shipment.estimatedDeparture),
          estimatedArrivalDate: new Date(shipment.estimatedArrival),
        }));
        setShipments(data);
        const orderKeys: any = [];
        Object.keys(data[0])?.forEach(function (key) {
          orderKeys[key] = "asc";
        });
        setOrder(orderKeys);
      }
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFilter(currentFilter: any, filterField: any) {
    const newFilter = filters.slice();
    newFilter[filterField] = currentFilter;
    Object.keys(filters)?.forEach(function (key: any) {
      if (key === filterField) newFilter[key] = currentFilter;
      else newFilter[key] = filters[key];
    });
    setFilters(newFilter);
  }

  return (
    <Box maxWidth="94vw" margin="2vw">
      <Text fontSize="32px">Shipment information</Text>
      <HStack marginTop="2vh" spacing="4rem">
        <TableOfShipments shipmentsProps={shipments} filtersProps={filters} />
        <VStack spacing="3rem" alignSelf="flex-start">
          <Button onClick={()=>onNewOpen()} colorScheme="blue">Add new shipment</Button>
          <VStack>
            <Text fontSize="18px">
              Quick Information
              <br />
              (no filter)
            </Text>
            <HStack>
              <VStack>
                <Text>in route</Text>
                <Text>at destination</Text>
                <Text>held in customs</Text>
              </VStack>
              <VStack>
                <Text></Text>
                <Text>
                  {
                    shipments?.filter((ship) => ship.status === "In Transit")
                      .length
                  }
                </Text>
                <Text>
                  {
                    shipments?.filter((ship) => ship.status === "Arrived")
                      .length
                  }
                </Text>
                <Text>
                  {
                    shipments?.filter((ship) => ship.status === "Customs Hold")
                      .length
                  }
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack alignItems="stretch" spacing="2rem">
            <Text fontSize="18px" alignSelf="center">
              Filters
            </Text>
            <VStack>
              <Text alignSelf="flex-start">Company</Text>
              <Select
                /*@ts-ignore*/
                value={filters["clientName"] ? filters["clientName"] : ""}
                placeholder="Select option"
                onChange={(e) => addFilter(e.target.value, "clientName")}
              >
                {shipments
                  ?.map((s) => s.clientName)
                  ?.filter((v, i, a) => a.indexOf(v) === i)
                  ?.sort()
                  ?.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
              </Select>
            </VStack>
            <VStack>
              <Text alignSelf="flex-start">Mode</Text>
              <Select
                /*@ts-ignore*/
                value={filters["mode"] ? filters["mode"] : ""}
                placeholder="Select option"
                onChange={(e) => addFilter(e.target.value, "mode")}
              >
                {shipments
                  ?.map((s) => s.mode)
                  ?.filter((v, i, a) => a.indexOf(v) === i)
                  ?.sort()
                  ?.map((mode) => (
                    <option key={mode} value={mode?.toString()}>
                      {mode}
                    </option>
                  ))}
              </Select>
            </VStack>
            <VStack>
              <Text alignSelf="flex-start">Status</Text>
              <Select
                /*@ts-ignore*/
                value={filters["status"] ? filters["status"] : ""}
                placeholder="Select option"
                onChange={(e) => addFilter(e.target.value, "status")}
              >
                {shipments
                  ?.map((s) => s.status)
                  ?.filter((v, i, a) => a.indexOf(v) === i)
                  ?.sort()
                  ?.map((status) => (
                    <option key={status} value={status?.toString()}>
                      {status}
                    </option>
                  ))}
              </Select>
            </VStack>
            <Button onClick={() => setFilters([])}>Clear filters</Button>
          </VStack>
        </VStack>
      </HStack>
      <Pagination />
      <NewShipmentModal
        onClose={onNewClose}
        isOpen={isNewOpen}
      />
    </Box>
  );
};
