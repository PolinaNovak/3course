import { Controller, Get, Query, Res } from '@nestjs/common';
import { QueryService } from './query.service';
import { Response } from 'express';

@Controller()
export class QueryController {
  constructor(private readonly appService: QueryService) {}

  @Get('first')
  async getFirst(
    @Query() query: { weight: string },
    @Res() response: Response,
  ) {
    try {
      response.json(await this.appService.getFirst(parseFloat(query.weight)));
    } catch (e) {
      response.status(500).end();
    }
  }

  @Get('second')
  async getSecond(
    @Query() query: { breedName: string },
    @Res() response: Response,
  ) {
    try {
      response.json((await this.appService.getSecond(query.breedName))[0]);
    } catch (e) {
      response.status(500).end();
    }
  }

  @Get('third')
  async getThird(
    @Query() query: { age: string; dietNumber: string },
    @Res() response: Response,
  ) {
    try {
      response.json(
        await this.appService.getThird(query.age, query.dietNumber),
      );
    } catch (e) {
      response.status(500).end();
    }
  }

  @Get('fourth')
  async getFourth(
    @Query() query: { workerId: string },
    @Res() response: Response,
  ) {
    try {
      response.json(await this.appService.getFourth(parseInt(query.workerId)));
    } catch (e) {
      response.status(500).end();
    }
  }
}
