import { DataSource } from 'typeorm';
import { Diagnose } from './diagnose.entity';

export const diagnoseProviders = [
  {
    provide: 'DIAGNOSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Diagnose),
    inject: ['DATA_SOURCE'],
  },
];
