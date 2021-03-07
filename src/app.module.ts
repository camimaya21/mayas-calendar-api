import { Module } from '@nestjs/common';
import { ConfigKeys } from './shared/config/config.keys';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { DatabaseModule } from './shared/database/database.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule, DatabaseModule, EventsModule]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(ConfigKeys.PORT);
  }
}
