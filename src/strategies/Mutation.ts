import { Genome } from "../Individual.ts";
import { World } from "../World.ts";
import { getRandomNumber } from "../utils/random.ts";

export type MutationStrategy = (genome: Genome) => void;

export type Mutation = ReturnType<typeof MutationGenerator>;

export function MutationGenerator(world: World) {
  /**
   * Mutates a given genome inplace
   */
  class Mutation {
    public static Swap: MutationStrategy = (genome) => {
      if (genome.length === 1) throw new Error("Genome length should NOT be 1");
      const swapEl1 = getRandomNumber(0, genome.length);
      let swapEl2 = getRandomNumber(0, genome.length);
      while (swapEl1 === swapEl2) swapEl2 = getRandomNumber(0, genome.length);
      [genome[swapEl1], genome[swapEl2]] = [genome[swapEl2], genome[swapEl1]];
    };

    public static Rotate: MutationStrategy = (genome) => {
      if (genome.length === 1) throw new Error("Genome length should NOT be 1");
      let swapEl1 = getRandomNumber(0, genome.length);
      let swapEl2 = getRandomNumber(0, genome.length);
      while (swapEl1 === swapEl2) swapEl2 = getRandomNumber(0, genome.length);
      if (swapEl1 > swapEl2) [swapEl1, swapEl2] = [swapEl2, swapEl1];
      const subGenome = genome.slice(swapEl1, swapEl2 + 1);
      subGenome.reverse();
      for (let i = swapEl1; i <= swapEl2; i++) {
        genome[i] = subGenome[i - swapEl1];
      }
    };
  }
  return Mutation;
}
