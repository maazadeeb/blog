---
title: Ant Colony Optimization for Traveling Salesperson Problem
date: "2021-01-23"
layout: post
draft: false
path: "/posts/ant-colony-optimization-for-tsp"
category: "Programming"
tags:
  - "Algorithm"
  - "ACO"
  - "TSP"
description: Learn about how we can simulate an ant colony to solve the popular traveling salesperson problem
---

Have you heard of the Traveling Salesperson Problem (TSP)? If not, here is an excerpt from [Wikipedia](https://en.wikipedia.org/wiki/Travelling_salesman_problem):

> Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?

While it might sound trivial, it's quite a hard (NP-hard) problem to solve and most solutions target approximate answers. I worked on implementing something known as the Ant Colony Optimization (ACO) as part of one of my grad projects at UC Irvine. I was surprised at the simplicity of the algorithm and how nicely it worked.

The idea of the algorithm is to emulate how ants find their food and leave marks behind for their fellow ants to follow suite. By repeating this process programmatically, we try to approximate a good TSP tour. Here's the [paper][1] that I referred to implement it. While the paper introduces the idea of ant colonies and how they are being emulated in the algorithm, I take a more programmatic approach on explaining the concept. If you prefer a more abstract explanation, I encourage you to read the paper.

# Some Terms

I'll define some terms before I begin explaining the algorithm and the implementation

1. Tour: Any cycle in which we visit each city only once and return back to the starting point
1. Ant: This is an "agent" which can basically remember the path it has taken till now and has the ability to choose a next city to visit, based on certain parameters that we will discuss later
1. Pheromone: A scent that ants continuously drop on paths that they are taking, so that the ants that come after them follow the same path. Biologically, ants are known to have limited sight and very good sense of smell

# Algorithm

I'll post snippets of working code that are relevant to the implementation, and then expand on them. You have access to the entire source code [here][2]. Before diving in, let me try to summarize the algorithm in words:

We have a distance matrix, `adjMatrix`, that tells us the distance between each pair of the `N` cities. Initially, the amount of pheromone on each edge is the same and we track that by creating a `pheromones` matrix initialized with the value 1. We start off by placing one ant on each of the city and then moving each ant to an unvisited city one-by-one. The way an ant chooses the next city to visit is probably the most crucial part of the algorithm:

> an ant chooses between the various options it has, based on a probability that is based on the amount of pheromone on an edge and the weight of the edge - the edge with the least distance and highest pheromone has the highest probability to be chosen. Remember here, **probability**.

We say one cycle of the algorithm is done when all ants have no other cities to visit. We then store the best tour that was found, if any. At this point, we update the pheromone on each edge. Edges that were part of a shorter tour receive higher amount of pheromone (Can you see how this will eventually affect the future cycles?). Along with this, after every cycle, we'll also reduce the pheromones by a certain factor, so that infrequent short tours are not given priority all the time.

I would recommend you to read this _at least_ two times. You should be able to appreciate the reason why we lay pheromones and why the probability is a function of both distance and pheromone strength.

Let's dive in!

## Data structures

1. `adjMatrix`: The adjacency matrix of the input graph
1. `pheromones`: The matrix that maintains the amount of pheromone on each edge at any given time
1. `ants`: An array of `Ant`s that are going around the graph. (We were taught that classes are blueprints of real world entities. It doesn't get any more real-world than this!)

## Runner program

The runner program ended up summarizing the algorithm pretty neatly

```java
while (shouldContinue()) {
    initAnts();

    for (int i = 1; i < numOfCities; i++) {
        for (Ant ant : ants) {
            ant.moveToNext(adjMatrix, pheromones); // highlight-line
        }
    }
    findBestTour();
    evaporate();
    updatePheromones();
}
System.out.printf("Best found TSP solution of cost %f visiting %s%n",
    bestTourLength,
    bestTourPath
);
```

While the combination of function names and my previous description should help understand the algorithm clearly, I would like to give some more details

1. `shouldContinue`: While my implementation just checks whether the algorithm has run 2000 cycles, there can be more checks like:
   - If a better solution is not found for a few cycles, say 20, then stop running
   - If time elapsed is more than a certain threshold, then stop running
1. `initAnts`: Creates `numOfCities` ants and marks their starting city
1. `findBestTour`: Loops over `ants` and stores the best tour found, compared to anything previously found, by storing `bestTourLength` and `bestTourPath`
1. `evaporate`: Reduces previous pheromones by half. I've chosen half as it is a value presented to work nicely in the [paper][1]
1. `updatePheromones`: Here, we iterate over the tour found by each ant and add pheromone to the edges on the path, which is equal to `Q3 / tourLength`, where `Q3` is a constant value 100.

Finally, you might have noticed the highlighted line above. This is the previously mentioned crucial aspect about how an ant moves, which I'll expand a bit more on.

## `moveToNext`

The `moveToNext` function is part of the `Ant` class. I've trimmed out non-relevant pieces of code again. Feel free to read it on [GitHub][2]. Here, we calculate the value for the edge, `edgeWeightage`, based on the current pheromone and the edge weight in `calculateEdgeWeightage`. While the edge weight remains the same throughout the whole execution of the program, the pheromone level will continuously vary based on how the ants travel. Also, notice that there are parameters to vary the influence of edge weight and pheromones. We can vary them to make our ant colony respond differently.

```java
public class Ant {
    public void moveToNext(Matrix adjMatrix, Matrix pheromones) {
        int nextNode = findNextNode(adjMatrix, pheromones);
        tourLength += adjMatrix.get(getCurNode(), nextNode);
        visit(nextNode);
    }

    private int findNextNode(Matrix adjMatrix, Matrix pheromones) {
        Map<Integer, Double> distribution = new HashMap<>();
        double totalEdgeWeightage = 0.0;
        for (int i = 0; i < adjMatrix.getSize(); i++) {
            if (!visited.containsKey(i)) {
                double edgeWeightage = calcEdgeWeightage(
                        adjMatrix.get(getCurNode(), i),
                        pheromones.get(getCurNode(), i)
                );
                totalEdgeWeightage += edgeWeightage;
                distribution.put(i, edgeWeightage);
            }
        }

        return getNextNodeByProbability(distribution, totalEdgeWeightage);
    }

    private Integer getNextNodeByProbability(Map<Integer, Double> distribution, double totalEdgeWeightage) {
        // Copied from https://stackoverflow.com/a/20329901/2950032
        double rand = this.rand.nextDouble();
        double ratio = 1.0f / totalEdgeWeightage;
        double tempDist = 0;
        for (Integer i : distribution.keySet()) {
            tempDist += distribution.get(i);
            if (rand / ratio <= tempDist) {
                return i;
            }
        }
        throw new RuntimeException("Vertex not found for some reason");
    }

    private double calcEdgeWeightage(double edgeCost, double pheromone) {
        return Math.pow(1.0f / edgeCost, Config.getEdgeWeightStrength())
                * Math.pow(pheromone, Config.getPheromoneStrength());
    }

}
```

It took me some time to figure out how to figure out probability in Java. While the link in the code points to a StackOverflow post from where I copied over the logic, here is a brief explanation of what is happening in `getNextNodeByProbability`. We go over the distribution by keys, as though it was a cumulative histogram and we're looking for a bucket where `rand * totalEdgeWeightage` lies. Say `{0: 100, 1: 200, 2: 300}` was our distribution, then our cumulative histogram would be like `0 -> 100, 1 -> 300, 2 -> 600`, and if `rand` was 0.5 then, `rand * totalEdgeWeightage` would be `0.5 * 600 = 300`. This would result in the code returning `1` as the city that's picked next.

# Conclusion

I would recommend you to run the program for yourself and pass in various kinds of inputs to see how the algorithm behaves. I particularly had fun seeing how nicely the ants find different paths as single entities, but using the `pheromones` matrix, they share their collective findings. I took part in a contest organized by the faculty for this project, where we were asked to run our code on a 100 problems, varying from 25 cities to a 1000 cities. The ACO algorithm works very well till about 400 cities, after which we start seeing large delays. The algorithm is effectively an `O(numOfCycles * n^3)`, but converges to a nice solution quite quickly, after which you can wait or terminate.

[1]: https://www.researchgate.net/publication/2573263_Positive_Feedback_as_a_Search_Strategy
[2]: https://github.com/maazadeeb/tsp-aco
