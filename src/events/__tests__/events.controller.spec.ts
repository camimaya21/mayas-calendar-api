import { Test, TestingModule } from '@nestjs/testing';
import { SERVICES } from '../../shared/constants/injectables.constants';
import { CreateEventDTO } from '../dto/events.dto';
import { EventsController } from '../events.controller';
import { EVENTS_SERVICE_MOCK_RESPONSE, TEST_EVENT_ID } from '../__mocks__/events.mock.data';
import {
  MockEventsService,
  mockCreate,
  mockDelete,
  mockFindOne,
  mockFindAll,
  mockUpdate
} from '../__mocks__/events.service.mock';

describe('Events Controller', () => {
  let controller: EventsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: SERVICES.IEventsService, useClass: MockEventsService }]
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.findOne', async () => {
    await controller.findOneEvent(TEST_EVENT_ID, {});
    expect(mockFindOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
  });

  it('should call service.findAll', async () => {
    mockFindAll.mockResolvedValue(EVENTS_SERVICE_MOCK_RESPONSE);
    await controller.findOneEvent(TEST_EVENT_ID, {});
    const res = await controller.findAllEvents({});

    expect(mockFindAll).toHaveBeenCalledWith({});
    expect(res).toHaveLength(2);
    expect(res[0].id).toBe(TEST_EVENT_ID);
  });

  it('should call service.create', async () => {
    const eventData: CreateEventDTO = {
      title: 'some cool title',
      description: 'this is an example body',
      startDate: '2021-03-07T10:00:00.000Z',
      endDate: '2021-03-07T11:00:00.000Z'
    };

    await controller.createEvent(eventData);
    expect(mockCreate).toHaveBeenCalledWith(eventData);
  });

  it('should call service.update', async () => {
    const updatedEventData: CreateEventDTO = {
      title: 'some cool title',
      description: 'this is an example body',
      startDate: '2021-03-07T10:00:00.000Z',
      endDate: '2021-03-07T11:00:00.000Z'
    };

    await controller.updateEvent(TEST_EVENT_ID, updatedEventData);
    expect(mockUpdate).toHaveBeenCalledWith(TEST_EVENT_ID, updatedEventData);
  });

  it('should call service.delete', async () => {
    await controller.deleteEvent(TEST_EVENT_ID);
    expect(mockDelete).toHaveBeenCalledWith(TEST_EVENT_ID);
  });
});
