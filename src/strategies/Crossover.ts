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
      const crossoverPosition = getRandomNumber(1, motherGenome.length - 1);
      const offspring1Genome: Genome = [];
      const offspring2Genome: Genome = [];

      // Generate genome for offspring1 -> Head from mother and tail from father
      offspring1Genome.push(...motherGenome.slice(0, crossoverPosition));
      offspring1Genome.push(
        ...fatherGenome.filter(
          (chromosome) => offspring1Genome.indexOf(chromosome) === -1
        )
      );

      // Generate genome for offspring2 -> Head from father and tail from mother
      offspring2Genome.push(...fatherGenome.slice(0, crossoverPosition));
      offspring2Genome.push(
        ...motherGenome.filter(
          (chromosome) => offspring2Genome.indexOf(chromosome) === -1
        )
      );
      return [offspring1Genome, offspring2Genome];
    };

    // Implement more crossover methods
  }
  return Crossover;
}
