export type DeliveryStatus = 'delivered' | 'undelivered';
export type Status = DeliveryStatus | 'idle';
export type Deliveries = Delivery[];

export interface Delivery {
  id: string;
  client: string;
  customer: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  };
  delivery: {
    status: Status;
    latitude: number;
    longitude: number;
  };
  active?: boolean;
}

export interface DeliveryInfo {
  status: DeliveryStatus;
  latitude: number;
  longitude: number;
}

export interface DeliveryStatusResponse {
  delivery: DeliveryInfo;
}
