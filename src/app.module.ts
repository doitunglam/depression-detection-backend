import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreauthMiddleware } from './auth/preauth.middleware';
import { EvidenceModule } from './evidence/evidence.module';
import { DatabaseModule } from './database/database.module';
import { Database } from './database/database';

@Module({
  imports: [DatabaseModule, EvidenceModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
