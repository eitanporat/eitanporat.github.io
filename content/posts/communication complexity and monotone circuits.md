---
author: "Eitan Porat"
title: "A Connection Between Communication Complexity and Circuit Depth"
date: "2023-02-26"
description: ""
tags:
ShowToc: true
ShowBreadCrumbs: false
math: true
---

## Lower Bounds
Computer scientists are interested in proving lower bounds for their algorithms. Lower bounds are important because they give algorithm designers some metric about how efficient their algorithms can be. 


Computer scientists are usually interested in showing lower bounds for the running time of [Turing Machines](https://en.wikipedia.org/wiki/Turing_machine), which are computational models that emulate how our computers work (with some "small" overhead). 

## Non-Uniform Circuits
As is the usual motif in theoretical computer science, showing lower bounds for Turing Machines is considered difficult, and computer scientists have found it easier to analyse lower bounds in the setting of non-uniform circuits. In the non-uniform circuit model, we assume that we are given some circuit $C_{n}$ which computes some function $f:\lbrace 0,1\rbrace^{n}\to \lbrace 0,1\rbrace$. 


Our circuits are modeled as directed acyclic graphs with nodes representing inputs, outputs and intermediate computations. This computations are done using some simple operations (called gates) acting on bits, for example:
* NOT gates ($\lnot$)
* OR gates ($\vee$)
* AND gates ($\wedge$)
These gates are enough to do any computation, and as such are called *universal gates*. 


Since circuits are directed graphs we can view them as layered computations. At the first layer we start with the input $x \in \lbrace0,1\rbrace^{n}$, and at each layer we apply some "local" computation to nodes from the previous layer. The final layer is usually one node which we call the output of the circuit.

> ![Example of a circuit](https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Three_input_Boolean_circuit.jpg/640px-Three_input_Boolean_circuit.jpg "An example of a circuit with 3 layers.")


The reason why circuits are easier to prove lower bounds than Turing Machines, is that we can easily model the local computation done between consecutive layers. 

In contrast to the time complexity of Turing Machines: we usually quantify the running time of circuits by their number of layers (or depth). Think of the depth of the circuit as the number of consecutive computations performed on the input.

A major caveat is that the size of the circuit cannot be arbitrarily large (!), and we usually want it to be polynomial in the input's size, as we cannot build arbitrarly big circuits.

We know how to prove non-uniform circuit lower bounds for some specific functions (such as parity), but in general we don't know how this could done.

<!-- ##### [For more information about how depth and size of circuits relate to Turing machines]() -->


## Monotone Functions and Circuits
To resolve this difficulty, we focus on an even simpler problem. That of finding lower bounds (depth lower bounds) for monotone circuits which compute monotone functions.

What are monotone functions? We can define an ordering on strings by lexicographic ordering ($x_{1}\cdots x_{n} \geq y_{1}\cdots y_{n}$ iff for every $1\leq i\leq n$, $x_i \geq y_i$)
> a function is called *monotonic* if $x\leq y$, then $f(x) \leq f(y)$ (for example: $0 \leq 1$).

Monotone circuits are circuits which compute monotone functions. They consist of an even more restricted set of gates than we previously saw. In our case: 
* OR gates ($\vee$)
* AND gates ($\wedge$)

and as such, monotone circuits are not universal and cannot compute arbitrary functions only monotone functions. But how could a function like $f(x) = 1$ be computed only OR and AND gates? Any circuit consisting of OR and AND gates which takes as input the string $x=0^{n}$ must return $0$.

To fix this we augment the input to the circuit by adding *advice*, a constant string $a_{n}$.

I will finish this section with some questions for the reader.
1. Why do monotone circuits compute monotone functions?
2. Given some montone function $f$, think of a depth-3 monotone circuit which computes $f$.

## Communication Complexity
We will now go on to talk about something that is seemingly unrelated: communication complexity. This concept has surprising connections to what we previously discussed.

In the setting of communication complexity two players (Alice and Bob) want to solve some task together. Alice is given the clue $x$ and Bob is given $y$ and they need to compute some function of $x$ and $y$. We assume that both players have unlimited computational power and are interested in the amount of information (*bits*) communicated between them.

### Karchmer-Widgerson Games
We are interested in a specific class of games, these are called Karchmer-Widgerson games. The game is defined as follows for some monotone function $f$:
> Karchmer-Widgerson Game $M_f$:
> * Alice gets $x \in \lbrace 0, 1 \rbrace^{n}$ such that $f(x) = 1$.
> * Bob gets $y \in \lbrace 0, 1 \rbrace^{n}$ such that $f(y) = 0$. 
> * **Goal:** Find $i$ such that $x_i > y_i$.

By monotonicity of $f$ there exists such an $i \in \lbrace 1,\dots,n \rbrace$. A naïve approach would be for one of the sides to communicate his string to the other side, but this is costly as it would require $n$ bits of communication. 