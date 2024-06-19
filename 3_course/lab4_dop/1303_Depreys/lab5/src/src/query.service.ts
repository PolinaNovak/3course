import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chicken } from './Models/chicken.model';
import sequelize, { Op } from 'sequelize';
import { WatchingChickenInCage } from './Models/watching_chicken_in_cage.model';
import { Worker } from './Models/worker.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class QueryService {
  constructor(
    @InjectModel(Chicken) private chickenRepository: typeof Chicken,
    private sequelize: Sequelize,
  ) {}
  async getFirst(weight: number): Promise<Chicken[]> {
    return this.chickenRepository.findAll({
      attributes: ['chicken_id', 'eggs_per_month'],
      where: {
        weight: {
          [Op.and]: {
            [Op.lt]: weight + 0.0001,
            [Op.gt]: weight - 0.0001,
          },
        },
      },
      limit: 10,
      order: [['eggs_per_month', 'DESC']],
    });
  }

  async getSecond(breedName: string) {
    return this.sequelize.query(
      'SELECT workshop_number FROM cell\n' +
        '\tINNER JOIN watching_chicken_in_cage USING(cell_id)\n' +
        '\tINNER JOIN chicken USING(chicken_id)\n' +
        'WHERE\n' +
        "\tbreed_name = '" + breedName + "'\n" +
        'GROUP BY workshop_number\n' +
        'ORDER BY COUNT(workshop_number) DESC\n' +
        'LIMIT 1;\n',
    );
  }

  async getThird(age: string, dietNumber: string) {
    return this.sequelize.query(
      'SELECT cell_id, workshop_number, row_number, cell_number FROM cell \n' +
        '\tINNER JOIN watching_chicken_in_cage USING(cell_id) \n' +
        '\tINNER JOIN chicken USING(chicken_id)\n' +
        '\tINNER JOIN breed USING(breed_name)\n' +
        'WHERE\n' +
        "\trecommended_diet_number = '" + dietNumber + "' AND" +
        "\tage = '" + age + "';",
    );
  }

  async getFourth(workerId: number) {
    return this.chickenRepository.findAll({
      attributes: [
        [sequelize.literal('(SUM(eggs_per_month) / 30.44)'), 'eggs_per_day'],
      ],
      include: [
        {
          model: WatchingChickenInCage,
          required: true,
          attributes: [],
          include: [
            {
              model: Worker,
              required: true,
              where: {
                worker_id: workerId,
              },
              attributes: [],
            },
          ],
        },
      ],
      group: ['watching_chicken_in_cages->worker.worker_id'],
      limit: 10,
    });
  }
}
