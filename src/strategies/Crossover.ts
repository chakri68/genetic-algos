import { Genome, Individual } from "../Individual.ts";
import { World } from "../World.ts";
import { getRandomNumber } from "../utils/random.ts";

export type CrossoverStrategy = (
  mother: Genome,
  father: Genome
) => [Genome, Genome];

export type Crossover = ReturnType<typeof CrossoverGenerator>;

export function CrossoverGenerator(world: World) {
  /**
   * Generates n random genomes and return them
   */
  class Crossover {
    public static SinglePointCrossover: CrossoverStrategy = (
      motherGenome,
      fatherGenome
    ) => {
      const crossoverPosition = getRandomNumber(0, motherGenome.length);
      const offspring1: Genome = [];
      const offspring2: Genome = [];

      // Generate genome for offspring1 -> Head from mother and tail from father
      offspring1.push(...motherGenome.slice(0, crossoverPosition));
      offspring1.push(
        ...fatherGenome.filter(
          (chromosome) => offspring1.indexOf(chromosome) === -1
        )
      );

      // Generate genome for offspring2 -> Head from father and tail from mother
      offspring2.push(...fatherGenome.slice(0, crossoverPosition));
      offspring2.push(
        ...motherGenome.filter(
          (chromosome) => offspring1.indexOf(chromosome) === -1
        )
      );
      return [offspring1, offspring2];
    };

    // Implement more crossover methods
  }
  return Crossover;
}
