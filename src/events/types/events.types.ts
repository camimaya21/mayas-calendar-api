import { Event, Prisma } from '@prisma/client';

export interface ParamsFindAllEvents {
  cursor?: Prisma.EventWhereUniqueInput;
  where?: Prisma.EventWhereInput;
  orderBy?: Prisma.EventOrderByInput;
}

export interface ParamsUpdateEvent {
  where: Prisma.EventWhereUniqueInput;
  data: Prisma.EventUpdateInput;
}

export interface IEventsRepository {
  findOne(params: Prisma.EventWhereUniqueInput): Promise<Event | null>;
  findAll(params: ParamsFindAllEvents): Promise<Event[] | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
  update(params: ParamsUpdateEvent): Promise<Event>;
  delete(where: Prisma.EventWhereUniqueInput): Promise<Event>;
}
