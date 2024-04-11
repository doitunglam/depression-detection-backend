import { Controller, Req, Get } from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';

@Controller('diagnose')
export class DiagnoseController {
  constructor(private readonly diagnoseService: DiagnoseService) {}

  @Get()
  async getDiagnose(@Req() request: Request): Promise<any> {
    const diagnose = await this.diagnoseService.get(request['user'].user_id);
    if (diagnose) {
      return {
        status_code: 200,
        message: 'OK',
        diagnose: {
          result: diagnose.detail,
        },
      };
    } else {
      return {
        status_code: 500,
        message: 'Server Error',
      };
    }
  }
}
