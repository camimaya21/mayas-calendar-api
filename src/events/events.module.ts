import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/shared/config/config.module';
import { REPOSITORIES, SERVICES } from 'src/shared/constants/injectables.constants';
import { DatabaseModule } from 'src/shared/database/database.module';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventService } from './events.service';

const eventsService = { provide: SERVICES.IEventsService, useClass: EventService };
const eventsRespository = { provide: REPOSITORIES.IEventsRepository, useClass: EventsRepository };
@Module({
  providers: [eventsService, eventsRespository],
  exports: [eventsRespository],
  imports: [DatabaseModule, ConfigModule],
  controllers: [EventsController]
})
export class EventsModule {}
