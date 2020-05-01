import { AsyncRepository } from "../repository/repositories";
import Travel from "./schemas";

class TravelRepository extends AsyncRepository<Travel> {}

export default TravelRepository;
