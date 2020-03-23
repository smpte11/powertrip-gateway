import { AsyncRepository } from "../repository/repositories";

type Day = {
  date: Date;
  activities: number[];
};

export class DayRepository extends AsyncRepository<Day> {}
