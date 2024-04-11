import { Module } from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';
import { DatabaseModule } from 'src/database/database.module';
import { DiagnoseController } from './diagnose.controller';
import { diagnoseProviders } from './diagnose.providers';
import { evidenceProviders } from 'src/evidence/evidence.providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [DiagnoseController],
  providers: [DiagnoseService, ...diagnoseProviders, ...evidenceProviders],
})
export class DiagnoseModule {}
