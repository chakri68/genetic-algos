import { Individual, IndividualGenerator } from "./Individual.ts";
import { Crossover, CrossoverGenerator } from "./strategies/Crossover.ts";
import { Selection, SelectionGenerator } from "./strategies/Selection.ts";
import { Spawn, SpawnGenerator } from "./strategies/Spawn.ts";
import { sleep } from "./utils/async.ts";
import { assert } from "./utils/ts.ts";
import { City } from "./utils/types.ts";

export class World {
  private Spawn: Spawn;
  private Individual: ReturnType<typeof IndividualGenerator>;
  private Selection: Selection;
  private Crossover: Crossover;

  public population: Individual[] = [];
  public populationCount: number = 10;
  public generationCount: number = 1;

  constructor(public cities: City[]) {
    this.Spawn = SpawnGenerator(this);
    this.Individual = IndividualGenerator(this);
    this.Selection = SelectionGenerator(this);
    this.Crossover = CrossoverGenerator(this);
  }

  // SPAWN: Spawn method that spawns the initial population
  public spawn() {
    // Select the spawn type
    const spawn = this.Spawn.randomized(this.populationCount);
    for (const genome of spawn) {
      const individual = new this.Individual(genome);
      this.population.push(individual);
    }
  }

  // SELECTION: Select the parents
  private getParent() {
    const chance = Math.random();
    if (chance > 0.5) return this.Selection.Tournament();
    else return this.Selection.BiasedRoulette();
  }

  // CROSSOVER: Generate offspring
  private getOffspring(
    mother: Individual,
    father: Individual
  ): [Individual, Individual] {
    const [genome1, genome2] = this.Crossover.SinglePointCrossover(
      mother.genome,
      father.genome
    );
    return [new this.Individual(genome1), new this.Individual(genome2)];
  }

  // next generation
  public nextGen() {
    const offspring: Individual[] = [];
    while (offspring.length < this.populationCount) {
      // Select the parents and get offspring
      const mother = this.getParent();
      let father = this.getParent();
      while (father === mother) {
        father = this.getParent();
      }

      // Generate the offspring
      const [offspring1, offspring2] = this.getOffspring(mother, father);
      offspring.push(offspring1);
      offspring.push(offspring2);
    }

    // Add the offspring to the population
    this.population.push(...offspring);

    // Order by population
    this.population.sort((a, b) => a.getFitness() - b.getFitness()); // Works since there is only one objective

    this.population.length = this.populationCount;

    this.generationCount += 1;
  }

  // Helper Functions
  private getBestIndividual(): Individual {
    let bestIndividual: Individual | null = null;
    for (const individual of this.population) {
      if (bestIndividual === null) {
        bestIndividual = individual;
        continue;
      }
      if (bestIndividual.getFitness() < individual.getFitness())
        bestIndividual = individual;
    }
    return assert(bestIndividual);
  }

  // REPORT STATS
  public printStats() {
    const generation = this.generationCount;
    const bestIndividual = this.getBestIndividual();
    console.log(
      `
=========
GEN ${generation}
      Best Individual Genome: ${bestIndividual.genome}
      Best Fitness: ${bestIndividual.getFitness()}`
    );
  }
}

export async function startSimulation() {
  // Start the genetic algorithm
  const world = new World([
    [0, 0],
    [10, 10],
    [5, 6],
    [9, 6],
  ]);

  // Spawn an initial population
  world.spawn();

  while (true) {
    world.nextGen();
    world.printStats();
    await sleep();
  }
}
