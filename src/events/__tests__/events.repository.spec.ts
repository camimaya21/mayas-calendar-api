import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/database/prisma.service';
import { CreateEventDTO, UpdateEventDTO } from '../dto/events.dto';
import { EventsRepository } from '../events.repository';
import { EVENTS_REPOSITORY_MOCK_DATA, TEST_EVENT_ID } from '../__mocks__/events.mock.data';

const MockPrismaService = {
  event: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
};

describe('EventsReposity', () => {
  let repository: EventsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsRepository,
        {
          provide: PrismaService,
          useValue: MockPrismaService
        }
      ]
    }).compile();

    repository = module.get<EventsRepository>(EventsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Find methods', () => {
    it('should properly call prismaService (no params)', async () => {
      await repository.findAll({});
      expect(MockPrismaService.event.findMany).toHaveBeenCalledTimes(1);
    });

    it('should properly call prismaService findOne with proper params', async () => {
      MockPrismaService.event.findUnique.mockResolvedValue(EVENTS_REPOSITORY_MOCK_DATA[0]);
      const res = await repository.findOne({ id: TEST_EVENT_ID });
      expect(MockPrismaService.event.findUnique).toHaveBeenCalledWith({
        where: { id: TEST_EVENT_ID }
      });
      expect(res.id).toBeDefined();
      expect(res.id).toBe(TEST_EVENT_ID);
    });
  });

  describe('Create methods', () => {
    it('should properly call prismaService create method', async () => {
      const eventData: CreateEventDTO = {
        title: 'some cool title',
        description: 'this is an example body',
        startDate: '2021-03-07T10:00:00.000Z',
        endDate: '2021-03-07T11:00:00.000Z'
      };

      await repository.create(eventData);

      expect(MockPrismaService.event.create).toHaveBeenCalledWith({
        data: {
          title: 'some cool title',
          description: 'this is an example body',
          start_date: new Date('2021-03-07T10:00:00.000Z'),
          end_date: new Date('2021-03-07T11:00:00.000Z')
        }
      });
    });
  });

  describe('Update methods', () => {
    it('should properly call prismaService update method', async () => {
      const eventUpdateData: UpdateEventDTO = {
        title: 'Updated title',
        description: 'this is an example body',
        startDate: '2021-03-07T10:00:00.000Z',
        endDate: '2021-03-07T11:00:00.000Z'
      };

      await repository.update({ id: TEST_EVENT_ID }, eventUpdateData);
      expect(MockPrismaService.event.update).toHaveBeenCalledWith({
        where: { id: TEST_EVENT_ID },
        data: {
          title: 'Updated title',
          description: 'this is an example body',
          start_date: new Date('2021-03-07T10:00:00.000Z'),
          end_date: new Date('2021-03-07T11:00:00.000Z')
        }
      });
    });
  });

  describe('Delete methods', () => {
    it('should properly call prismaService delete method', async () => {
      await repository.delete({ id: TEST_EVENT_ID });
      expect(MockPrismaService.event.delete).toHaveBeenCalledWith({
        where: { id: TEST_EVENT_ID }
      });
    });
  });
});
