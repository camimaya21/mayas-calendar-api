import { Body, Delete, Get, Inject, Param, Post, Put, Query, Controller } from '@nestjs/common';
import { SERVICES } from '../shared/constants/injectables.constants';
import { CreateEventDTO, EventDTO, UpdateEventDTO } from './dto/events.dto';
import { IEventsService, ParamsFindAllEvents, ParamsFindSingleEvent } from './types/events.types';

@Controller('events')
export class EventsController {
  constructor(@Inject(SERVICES.IEventsService) protected readonly eventsService: IEventsService) {}

  @Get('')
  async findAllEvents(@Query() params: ParamsFindAllEvents): Promise<EventDTO[]> {
    return this.eventsService.findAll(params);
  }

  @Get(':id')
  findOneEvent(@Param('id') id: string, @Query() params: ParamsFindSingleEvent) {
    params.id = id;
    return this.eventsService.findOne(params);
  }

  @Post('')
  createEvent(@Body() data: CreateEventDTO) {
    return this.eventsService.create(data);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() data: UpdateEventDTO) {
    return this.eventsService.update(id, data);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
