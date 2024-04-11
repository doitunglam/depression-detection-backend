import { Module } from '@nestjs/common';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';
import { evidenceProviders } from './evidence.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EvidenceController],
  providers: [EvidenceService, ...evidenceProviders],
  exports: [...evidenceProviders],
})
export class EvidenceModule {}
