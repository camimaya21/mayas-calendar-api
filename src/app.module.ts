import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigKeys } from './shared/config/config.keys';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { DatabaseModule } from './shared/database/database.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule, DatabaseModule, EventsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = _configService.get(ConfigKeys.PORT);
  }
}
