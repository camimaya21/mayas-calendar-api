import { Event, Prisma } from '@prisma/client';
import { CreateEventDTO, EventDTO, UpdateEventDTO, DeleteEventResult } from '../dto/events.dto';

export interface ParamsFindSingleEvent {
  id?: string;
  internalId?: number;
}

export interface ParamsFindAllEvents {
  cursor?: Prisma.EventWhereUniqueInput;
  where?: Prisma.EventWhereInput;
  orderBy?: Prisma.EventOrderByInput;
}

export interface IEventsRepository {
  findOne(params: ParamsFindSingleEvent): Promise<Event | null>;
  findAll(params: ParamsFindAllEvents): Promise<Event[] | null>;
  create(data: CreateEventDTO): Promise<Event>;
  update(where: ParamsFindSingleEvent, data: UpdateEventDTO): Promise<Event>;
  delete(where: ParamsFindSingleEvent): Promise<Event>;
}

export interface IEventsService {
  findOne(params: ParamsFindSingleEvent): Promise<EventDTO | null>;
  findAll(params?: ParamsFindAllEvents): Promise<EventDTO[]>;
  create(data: CreateEventDTO): Promise<EventDTO>;
  update(id: string, data: UpdateEventDTO): Promise<EventDTO>;
  delete(id: string): Promise<DeleteEventResult>;
}
