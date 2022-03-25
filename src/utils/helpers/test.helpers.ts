import { build, fake, sequence, oneOf } from '@jackfranklin/test-data-bot';
import { Delivery } from 'types/deliveries.types';

export const BuildDelivery = build<Delivery>('Delivery', {
  fields: {
    client: fake((f) => f.company.companyName()),
    id: sequence((x) => `00${x}`),
    active: oneOf(true, false),
    customer: {
      name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
      address: fake((f) => f.address.streetAddress()),
      city: fake((f) => f.address.city()),
      zipCode: fake((f) => f.address.zipCode()),
      latitude: fake((f) => f.address.latitude()),
      longitude: fake((f) => f.address.longitude()),
    },
    delivery: {
      status: oneOf('idle', 'delivered', 'undelivered'),
      latitude: fake((f) => f.address.latitude()),
      longitude: fake((f) => f.address.longitude()),
    },
  },
});

export const mockGeolocation = {
  watchPosition: jest.fn(),
  getCurrentPosition: jest.fn(),
  clearWatch: jest.fn(),
};
