import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateEvidenceDTO } from './evidence.dto';
import { EvidenceService } from './evidence.service';

@Controller('evidence')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}
  @Post()
  async setEvidence(
    @Req() request: Request,
    @Body() createEvidenceDTO: CreateEvidenceDTO,
  ): Promise<any> {
    const evidence = await this.evidenceService.set(
      request['user']?.user_id,
      createEvidenceDTO.url,
    );
    if (evidence) {
      return {
        status: 200,
        message: 'OK',
      };
    } else {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }
}
