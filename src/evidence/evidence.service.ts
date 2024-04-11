import { Inject, Injectable } from '@nestjs/common';
import { Evidence } from './evidence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvidenceService {
  constructor(
    @Inject('EVIDENCE_REPOSITORY')
    private evidenceRepository: Repository<Evidence>,
  ) {}

  async getOne(user_id: string): Promise<Evidence> {
    return this.evidenceRepository.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  async set(user_id: string, url: string): Promise<Evidence> {
    if (
      (
        await this.evidenceRepository.find({
          where: {
            user_id: user_id,
            url: url,
            is_analyzed: false,
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
