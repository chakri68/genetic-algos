import { World } from "./World.ts";
import { Fitness } from "./strategies/Fitness.ts";

export type Genome = number[];

export interface Individual {
  genome: Genome;
  getFitness: () => number;
}

export function IndividualGenerator(world: World) {
  class Individual implements Individual {
    constructor(public genome: Genome) {}

    getFitness() {
      let fitness = 0;
      for (let i = 0; i < this.genome.length; i++) {
        const city = world.cities[this.genome[i]];
        const nextCity =
          world.cities[this.genome[(i + 1) % this.genome.length]];
        fitness -= Fitness.getEuclideanDistance(city, nextCity);
      }
      return fitness;
    }
  }

  return Individual;
}
