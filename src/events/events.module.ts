import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/shared/config/config.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { EventService } from './events.service';

@Module({
  providers: [EventService],
  imports: [DatabaseModule, ConfigModule]
})
export class EventsModule {}
