import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Diagnose } from './diagnose.entity';
import { Evidence } from 'src/evidence/evidence.entity';
import { HttpService } from '@nestjs/axios';
import { createWriteStream } from 'fs';
import { finished } from 'stream';
import { promisify } from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = promisify(require('node:child_process').exec);

@Injectable()
export class DiagnoseService {
  constructor(
    @Inject('DIAGNOSE_REPOSITORY')
    private diagnoseRepository: Repository<Diagnose>,

    @Inject('EVIDENCE_REPOSITORY')
    private evidenceRepository: Repository<Evidence>,
    private readonly httpService: HttpService,
  ) {}

  async get(user_id: string) {
    const diagnose = await this.diagnoseRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (diagnose) {
      return diagnose;
    }

    const evidence = await this.evidenceRepository.findOne({
      where: {
        user_id: user_id,
        is_analyzed: false,
      },
    });

    const url = evidence.url;

    const parts = decodeURIComponent(url).split('/');

    const filenameWithParams = parts[parts.length - 1];

    const filename = decodeURIComponent(filenameWithParams.split('?')[0]);

    const filePath = `storage\\${filename}`;

    const writer = createWriteStream(filePath);

    this.httpService.axiosRef
      .get(url, {
        responseType: 'stream',
      })
      .then((response) => {
        response.data.pipe(writer);
        return finished;
      });
    const { stdout } = await exec(
      `cd python & python -W ignore run.py ${filename}`,
    );

    const emotions = [
      'female_angry',
      'female_calm',
      'female_fearful',
      'female_happy',
      'female_sad',
      'male_angry',
      'male_calm',
      'male_fearful',
      'male_happy',
      'male_sad',
    ];

    const emotion = emotions[Number.parseInt(stdout)];

    console.log(emotion);

    const newDiagnose = this.diagnoseRepository.create();

    newDiagnose.detail = emotion;
    newDiagnose.user_id = evidence.user_id;
    evidence.is_analyzed = false;

    await this.evidenceRepository.save(evidence);
    await this.diagnoseRepository.save(newDiagnose);
    return newDiagnose;
  }
}
