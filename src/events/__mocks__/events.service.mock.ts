import { EVENTS_SERVICE_MOCK_RESPONSE } from './events.mock.data';

export const mockFindAll = jest.fn();
export const mockFindOne = jest.fn();
export const mockCreate = jest.fn().mockResolvedValue(EVENTS_SERVICE_MOCK_RESPONSE);
export const mockUpdate = jest.fn().mockResolvedValue(EVENTS_SERVICE_MOCK_RESPONSE);
export const mockDelete = jest.fn().mockResolvedValue(EVENTS_SERVICE_MOCK_RESPONSE);

export const MockEventsService = jest.fn().mockImplementation(() => {
  return {
    findAll: mockFindAll,
    findOne: mockFindOne,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete
  };
});
