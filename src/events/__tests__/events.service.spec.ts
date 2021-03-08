import { Test, TestingModule } from '@nestjs/testing';
import { TEST_EVENT_ID, EVENTS_REPOSITORY_MOCK_DATA } from '../__mocks__/events.mock.data';
import { REPOSITORIES, SERVICES } from '../../shared/constants/injectables.constants';
import { EventsService } from '../events.service';
import { CreateEventDTO, UpdateEventDTO } from '../dto/events.dto';
import { MockEventsRepository } from '../__mocks__/events.repository.mock';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: REPOSITORIES.IEventsRepository, useValue: MockEventsRepository }
      ]
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find methods', () => {
    it('should properly call events.repository.findAll', async () => {
      MockEventsRepository.findAll.mockResolvedValue(EVENTS_REPOSITORY_MOCK_DATA);
      await service.findAll({});
      expect(MockEventsRepository.findAll).toHaveBeenCalled();
    });

    it('should properly call events.repository.findOne', async () => {
      MockEventsRepository.findOne.mockResolvedValue(EVENTS_REPOSITORY_MOCK_DATA[0]);
      await service.findOne({ id: TEST_EVENT_ID });
      expect(MockEventsRepository.findOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
    });
  });

  describe('Create methods', () => {
    it('should properly call events.repository.create', async () => {
      MockEventsRepository.findAll.mockResolvedValue([]);
      MockEventsRepository.create.mockResolvedValue(EVENTS_REPOSITORY_MOCK_DATA[0]);

      const eventData: CreateEventDTO = {
        title: 'some cool title',
        description: 'this is an example body',
        startDate: '2021-03-07T10:00:00.000Z',
        endDate: '2021-03-07T11:00:00.000Z'
      };

      const res = await service.create(eventData);

      expect(MockEventsRepository.create).toHaveBeenCalledWith(eventData);
      expect(res).toMatchObject({
        id: TEST_EVENT_ID,
        ...eventData
      });
    });
  });

  describe('Update methods', () => {
    const eventUpdateData: UpdateEventDTO = {
      title: 'A better title',
      description: 'this is an example body',
      startDate: '2021-03-07T10:00:00.000Z',
      endDate: '2021-03-07T11:00:00.000Z'
    };

    it('should properly call events.repository.update if event exist', async () => {
      MockEventsRepository.findOne.mockResolvedValue({ id: TEST_EVENT_ID });
      MockEventsRepository.update.mockResolvedValue(
        Object.assign(EVENTS_REPOSITORY_MOCK_DATA[0], {
          id: TEST_EVENT_ID,
          title: 'A better title'
        })
      );

      const res = await service.update(TEST_EVENT_ID, eventUpdateData);

      expect(MockEventsRepository.findOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
      expect(MockEventsRepository.update).toHaveBeenCalledWith(
        { id: TEST_EVENT_ID },
        eventUpdateData
      );
      expect(res).toMatchSnapshot();
    });

    it('should fail if no event has found', async () => {
      MockEventsRepository.findOne.mockResolvedValue(undefined);

      await expect(() => service.update(TEST_EVENT_ID, eventUpdateData)).rejects.toThrowError(
        'Event with id 01123b18-cf8b-451f-a699-441397f02949 not found'
      );

      expect(MockEventsRepository.findOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
      expect(MockEventsRepository.update).not.toHaveBeenCalled();
    });
  });
  describe('Delete methods', () => {
    it('should properly call events.repository.update if event exist', async () => {
      MockEventsRepository.findOne.mockResolvedValue(EVENTS_REPOSITORY_MOCK_DATA[0]);
      MockEventsRepository.delete.mockResolvedValue({ id: TEST_EVENT_ID });

      const res = await service.delete(TEST_EVENT_ID);

      expect(MockEventsRepository.findOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
      expect(MockEventsRepository.delete).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
      expect(res.id).toBe(TEST_EVENT_ID);
      expect(res.result).toBe('Event was deleted');
    });

    it('should fail if no event has found', async () => {
      MockEventsRepository.findOne.mockResolvedValue(undefined);

      await expect(() => service.delete(TEST_EVENT_ID)).rejects.toThrowError(
        'Event with id 01123b18-cf8b-451f-a699-441397f02949 not found'
      );

      expect(MockEventsRepository.findOne).toHaveBeenCalledWith({ id: TEST_EVENT_ID });
      expect(MockEventsRepository.delete).not.toHaveBeenCalled();
    });
  });
});
