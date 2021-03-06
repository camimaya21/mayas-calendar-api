import { IsDateString, IsUUID } from 'class-validator';
import { Event } from '@prisma/client';

export class CreateEventDTO {
  title: string;
  description: string;
  @IsDateString()
  startDate: string;
  @IsDateString()
  endDate: string;
}

export class EventDTO {
  @IsUUID()
  id: string;
  title: string;
  description: string;
  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;

  public static entityToDTO(event: Event): EventDTO {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.start_date,
      endDate: event.end_date
    };
  }
}
