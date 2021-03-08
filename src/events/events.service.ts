import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORIES } from '../shared/constants/injectables.constants';
import { CreateEventDTO, DeleteEventResult, EventDTO, UpdateEventDTO } from './dto/events.dto';

import {
  IEventsRepository,
  IEventsService,
  ParamsFindAllEvents,
  ParamsFindSingleEvent
} from './types/events.types';

@Injectable()
export class EventsService implements IEventsService {
  constructor(
    @Inject(REPOSITORIES.IEventsRepository) private eventsRepository: IEventsRepository
  ) {}

  async findOne(params: ParamsFindSingleEvent): Promise<EventDTO | null> {
    const res = await this.eventsRepository.findOne({ id: params.id });
    return EventDTO.entityToDTO(res);
  }

  async findAll(params: ParamsFindAllEvents): Promise<EventDTO[]> {
    const res = await this.eventsRepository.findAll(params);
    return res.map(EventDTO.entityToDTO);
  }

  async create(data: CreateEventDTO): Promise<EventDTO> {
    const res = await this.eventsRepository.create(data);
    return EventDTO.entityToDTO(res);
  }

  async update(id: string, data: UpdateEventDTO): Promise<EventDTO> {
    await this._checkEventExists(id);
    const res = await this.eventsRepository.update({ id }, data);
    return EventDTO.entityToDTO(res);
  }

  async delete(id: string): Promise<DeleteEventResult> {
    await this._checkEventExists(id);
    const res = await this.eventsRepository.delete({ id });
    return { id: res.id, result: 'Event was deleted' };
  }

  private async _checkEventExists(id: string) {
    const event = await this.eventsRepository.findOne({ id });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }
}
