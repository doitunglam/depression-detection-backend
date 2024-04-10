import { DataSource } from 'typeorm';
import { Evidence } from './evidence.entity';

export const evidenceProviders = [
  {
    provide: 'EVIDENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Evidence),
    inject: ['DATA_SOURCE'],
  },
];
