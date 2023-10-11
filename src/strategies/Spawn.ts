import { Genome } from "../Individual.ts";
import { World } from "../World.ts";
import { shuffleArray } from "../utils/random.ts";

export type SpawnStrategy = (n?: number) => Genome[];

export type Spawn = ReturnType<typeof SpawnGenerator>;

export function SpawnGenerator(world: World) {
  /**
   * Generates n random genomes and return them
   */
  class Spawn {
    public static randomized: SpawnStrategy = (n = 1) => {
      const cityCount = world.cities.length;
      const genomes: Genome[] = [];
      for (let i = 0; i < n; i++) {
        // Generate a random genome i.e a random permuatation of the order of cities
        genomes.push(
          shuffleArray(
            Array.from({ length: cityCount }, (_, idx) => idx)
          ) as Genome
        );
      }
      return genomes;
    };

    // Implement more Spawning ways
  }
  return Spawn;
}
