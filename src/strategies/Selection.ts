import { Individual } from "../Individual.ts";
import { World } from "../World.ts";
import { getRandomElement } from "../utils/random.ts";

export type SelectionStrategy = () => Individual;

export type Selection = ReturnType<typeof SelectionGenerator>;

export function SelectionGenerator(world: World) {
  /**
   * Selects an individual based on some pre determined rules to perform crossover on
   */
  class Selection {
    public static Tournament: SelectionStrategy = () => {
      const individual1 = getRandomElement(world.population);
      let individual2 = getRandomElement(world.population);
      while (individual1 === individual2)
        individual2 = getRandomElement(world.population);
      return individual1.getFitness() > individual2.getFitness()
        ? individual1
        : individual2;
    };

    // Implement more selection methods
    public static BiasedRoulette: SelectionStrategy = () => {
      const totalFitness = world.population.reduce(
        (acc, individual) => acc + individual.getFitness(),
        0
      );
      const cumulativeFitness = world.population.reduce(
        (acc: number[], individual: Individual) => {
          acc.push(
            acc[acc.length - 1] + individual.getFitness() / totalFitness
          );
          return acc;
        },
        []
      );
      const random = Math.random();
      let selectedIndividual: Individual = world.population[0];
      let i = 0;
      for (const fitness of cumulativeFitness) {
        if (fitness <= random) {
          selectedIndividual = world.population[i];
          break;
        }
        i += 1;
      }
      return selectedIndividual;
    };
  }
  return Selection;
}
