---
author: "Eitan Porat"
title: "The Ergodic Theorem"
date: "2023-03-18"
description: "What is Ergodic Theory? What are some of the applications of ergodic theory"
tags: ["ergodic theory"]
ShowToc: true
ShowBreadCrumbs: false
math: true
collapse: true
---
## Introduction
Suppose you want to model the dynamics of a gas inside a box. We model the gas as a bunch of molecules, which can hit each other and the box they are enclosed in. We consider the situation in which there is no loss of energy (elastic collisions, friction, heat, etc.).

We can write physical equations of motions to model this gas. The problem is that the number of balls is enormous, and we cannot describe the position and momentum of each particle. Nor can we solve these equations efficiently. What we can do is observe some physical quantity of the physical system (such as temperature, heat capacity, etc.). 

In mathematical terms, we have $N$ particles with positions $q_{1},q_{2},\dots,q_{N}$ (each 3-dimensional vectors) which momenta $p_{1},p_{2},\dots,p_{N}$ (also 3-dimensional vectors). We can collect all variables into a single variable $$x=(q_{1},q_{2},\dots,q_{N},p_{1},p_{2},\dots,p_{N}),$$ the state of the system. What we are interested in measuring is $f(x)$. But since molecules move very quickly $\approx 500 m/sec$, we assume that the period it takes to take a physical measurement is actually a long time for the molecules. That is, assuming that the system evolves at time $t$ as $P_t(x)$ we are actually measuring $$\frac{1}{\tau}\int_{0}^{\tau} P_{t}(x)dt,$$ where $\tau$ is the period of time it takes to take a physical measurement. But as we assumed $\tau$ is large (since each molecule moves so quickly), it is safe to assume we are measuring  $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} P_{t}(x)dt$$ Suppose the system has a fixed energy $C$. What the mean ergodic theorem states (Von-Neumann 1931) is that $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} f(P_{t}(x))dt=\int_{\mathcal{M}}{f(x)d\mu},$$ where $$\mathcal{M} = \lbrace x\mid E(x)=C\rbrace $$ the manifold of states with energy $C$ and $\mu$ which is the uniform measure over all states.

Intuitively, this means that taking a time-average measurement of a physical quantitiy is equivalent to computing an average of the physical quantity over all possible states.

My goal for the rest of the post is to prove this theorem and a close variant of it which was proven subsequently by Birkhoff in 1932.

## Formalizing even further
But before we begin let's formalize the conditions under which the Ergodic theorems are true. This is a useful framework and will allow us to generalize even further. 

In general, we are given some space $X$ (a set), with some transformation $T$ which needs to be measure preserving. What does this mean? 

Consider an ensemble of particles each with position $x$ and momentum $p$. The area of the blue pixels (the phase-space distribution) is constant along the time-evolution of the system. This result is known as Liouville's theorem.
![Louville theorem](https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamiltonian_flow_classical.gif)

To capture this notion, we define a measure $\mu$ (think of a volume function or a probability over phase space) to be a function which takes as input sets and returns values between $[0,1]$. This function has some other properties such as $\mu(\emptyset)=0$ and $\mu(X)=1$, and $\mu\left(\bigcup_{i}A_{i}\right)=\sum_{i}\mu(A_{i})$ for a countable collection of disjoint sets $\lbrace A_{1}, A_{2}, .... \rbrace$. [Click here for a more rigorous definition](https://en.wikipedia.org/wiki/Measure_%28mathematics%29). 

The measure needs to be $T$-preserving in the sense that for every measurable set $E$ we have $$\mu(E)=\mu(T^{-1}E).$$ 
a not very important aside... the reason we write $T^{-1}$ and not $T$ is for technical reasons ($T$ might not be invertible in general).

A system is said to be *ergodic* if there are no stationary sets except for sets which are of zero-measure or complements of sets of zero measure i.e. if $T(E)=E$ then $\mu(E)=0$ or $\mu(X\setminus E)=0$. In other words, a set can be *stationary* if it is "almost everything" or "almost nothing". 

We could imagine that the molecules of the gas are never confined to a specific part of the phase space, for example a smoke inside a room might eventually fills the room. It is worth to note that for most physical systems we don't know whether they are ergodic or not and we usually assume that this is true.

## Proof of the Mean-Ergodic Theorem
For the first proof of the ergodic theorem we only consider functions which are in $L^2$ this means that $$\int_{X}|f(x)|^{2}d\mu < \infty.$$ These functions form a Hilbert space, which is useful because we can apply some of our intuitions from linear algebra to these sort of spaces. Such as the notion of inner product $$\langle f,g \rangle = \int_{X}f(x)g(x)d\mu.$$ We will prove a discrete version of the mean ergodic theorem that is 
$$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=\int_{\mathcal{M}}{f d\mu},$$ important to note that this is true for every $x$.


### An important lemma - invariant functions are constant!
In ergodic systems, $T$-invariant functions are constant. Let $f$ be a function such that $f=f\circ T$. Consider the set $[f>t]$ that is $\lbrace x \mid f(x) > t \rbrace$. The preimage of $[f>t]$ under $T$ is $$T^{-1}[f>t] = \lbrace x \mid f\circ T(x) > t \rbrace = \lbrace x \mid f(x) > t \rbrace = [f>t].$$

By ergodicity, $\mu([f>t])=0$ or $\mu([f>t])=1$ and $\mu([f>t])$ is monotonically decreasing so there must be some critical value $t$ for which $\mu([f>t])=0$ but $\mu([f>t-\varepsilon])=1$ for every $\epsilon > 0$, so $f$ is constant and equal to $t$.

Insert figure here

### Some interesting cases
A trivial case to consider is when $f=f\circ T$ that is $f$ is $T$-invariant, we know in this case that $f$ is constant. In this case it is obvious that $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=f(x)=\int f(x)d\mu$$ 
Another interesting example to consider is when $f=1_{A}$ the indicator function for some set $A$ formally defined as $$1_{A}=\begin{cases}1 & x\in A 
\\\\ 0 & x\notin A\end{cases}$$ we see that $$\lim_{N\to \infty} \frac{|\lbrace 1\leq i \leq N \mid T^{i-1}(x) \in A \rbrace|}{N}=\mu(A)$$ i.e. we observe the fraction of times $x$ is enters the set $A$ over time and we see that it converges to the measure of the set. This implies that for every set $A$ of non-zero measure and some configuration $x$ there exists some time $n$ for which $T^{n}(x)\in A$ ([Poincaré recurrence theorem](https://en.wikipedia.org/wiki/Poincar%C3%A9_recurrence_theorem)).