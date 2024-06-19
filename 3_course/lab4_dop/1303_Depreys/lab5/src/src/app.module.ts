import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Breed } from './Models/breed.model';
import { Cell } from './Models/cell.model';
import { Chicken } from './Models/chicken.model';
import { WatchingChickenInCage } from './Models/watching_chicken_in_cage.model';
import { Worker } from './Models/worker.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'BirdFactory',
      models: [Breed, Cell, Chicken, WatchingChickenInCage, Worker],
    }),
    SequelizeModule.forFeature([Chicken, Cell, WatchingChickenInCage]),
  ],
  controllers: [QueryController],
  providers: [QueryService],
})
export class AppModule {}
