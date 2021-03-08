import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';
import { Event } from '@prisma/client';
import {
  IEventsRepository,
  ParamsFindAllEvents,
  ParamsFindSingleEvent
} from './types/events.types';
import { CreateEventDTO, UpdateEventDTO } from './dto/events.dto';
import { toDate } from 'date-fns';

@Injectable()
export class EventsRepository implements IEventsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(params: ParamsFindSingleEvent): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id: params.id, internal_id: params.internalId }
    });
  }

  async findAll(params: ParamsFindAllEvents): Promise<Event[]> {
    const { cursor, where, orderBy } = params;
    return this.prisma.event.findMany({ cursor, where, orderBy });
  }

  async create(data: CreateEventDTO): Promise<Event> {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start_date: toDate(new Date(data.startDate)),
        end_date: toDate(new Date(data.endDate))
      }
    });
  }

  async update(params: ParamsFindSingleEvent, data: UpdateEventDTO): Promise<Event> {
    return this.prisma.event.update({
      data: {
        title: data.title,
        description: data.description,
        start_date: toDate(new Date(data.startDate)),
        end_date: toDate(new Date(data.endDate))
      },
      where: { id: params.id, internal_id: params.internalId }
    });
  }

  async delete(params: ParamsFindSingleEvent): Promise<Event> {
    return this.prisma.event.delete({ where: { id: params.id, internal_id: params.internalId } });
  }
}
