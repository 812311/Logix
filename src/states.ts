import { atom } from "./utils/stateUtils";

export const atoms = {
  isAuth: atom<boolean>(false, "isAuth"),
  loginState: atom({ name: "Philipe", pass: "1234" }, "loginState"),
  shipments: atom<Shipment[] | undefined>([], "shipmentState"),
  headersTable: atom<any[]>([], "headersTable"),
  filtersTable: atom<any[]>([], "filtersTable"),
};

export type Mode = "Air" | "Sea" | "Rail" | undefined | null;
export type Status =
  | "Arrived"
  | "In Transit"
  | "Cancelled"
  | "Customs Hold"
  | "Roll-Over"
  | "Transport Error"
  | undefined
  | null;
export interface Shipment {
  shipmentId: string;
  clientName: string;
  origin: string;
  destination: string;
  mode: Mode;
  estimatedDeparture: string;
  estimatedDepartureDate: Date;
  estimatedArrival: string;
  estimatedArrivalDate: Date;
  status: Status;
}
