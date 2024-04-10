import { Inject, Injectable } from '@nestjs/common';
import { Evidence } from './evidence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvidenceService {
  constructor(
    @Inject('EVIDENCE_REPOSITORY')
    private evidenceRepository: Repository<Evidence>,
  ) {}

  async set(user_id: string, url: string): Promise<Evidence> {
    console.log(
      'prev',
      await this.evidenceRepository.find({
        where: {
          user_id: user_id,
          url: url,
        },
      }),
    );
    if (
      (
        await this.evidenceRepository.find({
          where: {
            user_id: user_id,
            url: url,
          },
        })
      ).length === 0
    ) {
      const evidence = this.evidenceRepository.create();
      evidence.is_analyzed = false;
      evidence.url = url;
      evidence.user_id = user_id;

      return this.evidenceRepository.save(evidence);
    }
    return null;
  }
}
