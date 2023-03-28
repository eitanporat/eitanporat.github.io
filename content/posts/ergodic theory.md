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

In mathematical terms, we have $N$ particles with positions $q_{1},q_{2},\dots,q_{N}$ (each 3-dimensional vectors) which momenta $p_{1},p_{2},\dots,p_{N}$ (also 3-dimensional vectors). We can collect all variables into a single variable $$x=(q_{1},q_{2},\dots,q_{N},p_{1},p_{2},\dots,p_{N}),$$ the state of the system. What we are interested in measuring is $f(x)$. But since molecules move very quickly $\approx 500 m/sec$, we assume that the period it takes to take a physical measurement is actually a long time for the molecules. That is, assuming that the system evolves at time $t$ as $P_t(x)$ we are actually measuring $$\frac{1}{\tau}\int_{0}^{\tau} P_{t}(x)dt,$$ where $\tau$ is the period of time it takes to take a physical measurement. But as we assumed $\tau$ is large (since each molecule moves so quickly), it is safe to assume we are measuring  $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} P_{t}(x)dt$$ Suppose the system has a fixed energy $C$. What the ergodic theorem states (Birkhoff) is that $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} f(P_{t}(x))dt=\int_{\mathcal{X}}{f(x)d\mu},$$ where $$\mathcal{X} = \lbrace x\mid E(x)=C\rbrace $$ a (compact) manifold of states with energy $C$ and $\mu$ which is the uniform measure over all states in the manifold.

Intuitively, this means that taking a time-average measurement of a physical quantity is equivalent to computing an average of the physical quantity over all possible states.

<!-- ## Goal of this post
\mathcal{X}y goal for the rest of the post is to prove this theorem and some close variants which were discovered around the same time. We will prove the discretized versions of the theorem. -->

## Formalizing even further
At this point we moved from a theoretical understanding of the subject to a mathematical perspective, we are trying to capture the essential conditions for which the ergodic theorem is true. We are trying to develop a useful framework and will allow us to generalize even further. 

In general, we are given some space $\mathcal{X}$ (a set), with some transformation $T$ (remember the time evolution operator $P_{t}$ we saw before). What might this transformation be in general?

Consider an ensemble of particles each with position $x$ and momentum $p$. The area of the blue pixels (the phase-space distribution) is constant along the time-evolution of the system. This result is known as [Liouville's theorem](https://en.wikipedia.org/wiki/Liouville%27s_theorem_(Hamiltonian)).
![Louville theorem](https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamiltonian_flow_classical.gif)

Ah-ha! This transformation must preserve the volume of the phase space or in general a measure we define on the space. 

To capture this notion, we define a measure $\mu$ to be a function which takes as input sets and returns values between $[0,1]$. This function has some other properties such as $\mu(\emptyset)=0$ and $\mu(\mathcal{X})=1$, and $\mu\left(\bigcup_{i}A_{i}\right)=\sum_{i}\mu(A_{i})$ for a countable collection of disjoint sets $\lbrace A_{1}, A_{2}, .... \rbrace$. [Click here for a more rigorous definition](https://en.wikipedia.org/wiki/Measure_%28mathematics%29). 

The measure needs to be $T$-preserving in the sense that for every measurable set $E$ we have $$\mu(E)=\mu(T^{-1}E).$$ 
a not very important aside... the reason we write $T^{-1}$ and not $T$ is for technical reasons ($T$ might not be invertible in general).

A system is said to be *ergodic* if there are no stationary sets except for sets which are of zero-measure or complements of sets of zero measure i.e. if $T(E)=E$ then $\mu(E)=0$ or $\mu(\mathcal{X}\setminus E)=0$. In other words, a set can be *stationary* if it is "almost everything" or "almost nothing". 

We could imagine that the molecules of the gas are never confined to a specific part of the phase space, for example a smoke inside a room might eventually fills the room. It is worth to note that for most physical systems we don't know whether they are ergodic or not and we usually assume that this is true.

## Proof of the Mean-Ergodic Theorem (Von Neumann `31)
We will start by proving the mean-ergodic theorem which is an easier variant to prove than the one states earlier.

For the proof of the mean ergodic theorem we only consider functions which are in $L^2$ this means that $$\int_{\mathcal{X}}|f(x)|^{2}d\mu < \infty.$$ These functions form a Hilbert space, which is useful because we can apply some of our intuitions from linear algebra to these sort of spaces. Such as the notion of inner product $$\langle f,g \rangle = \int_{\mathcal{X}}f(x)g(x)d\mu.$$ We will prove a discrete version of the mean ergodic theorem that is 
$$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f\circ T^{i-1} \overset{L^2}{\longrightarrow}\int_{\mathcal{X}}{f d\mu},$$ important to note that this is convergence is not pointwise but rather in $L^2$ (which is a less strict requirement).


### An important lemma - invariant functions are constant!
In ergodic systems, $T$-invariant functions are constant. Let $f$ be a function such that $f=f\circ T$. Consider the set $[f>t]$ that is $\lbrace x \mid f(x) > t \rbrace$. The preimage of $[f>t]$ under $T$ is $$T^{-1}[f>t] = \lbrace x \mid f\circ T(x) > t \rbrace = \lbrace x \mid f(x) > t \rbrace = [f>t].$$

By ergodicity, $\mu([f>t])=0$ or $\mu([f>t])=1$ and $\mu([f>t])$ is monotonically decreasing so there must be some critical value $t$ for which $\mu([f>t])=0$ but $\mu([f>t-\varepsilon])=1$ for every $\epsilon > 0$, so $f$ is constant and equal to $t$.

Insert figure here

### Some interesting cases
A trivial case to consider is when $f=f\circ T$ that is $f$ is $T$-invariant, we know in this case that $f$ is constant. In this case it is obvious that $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=f(x)=\int f(x)d\mu$$

**Insight 1: the time-average of a $T$-invariant function $f$ converges to the function $f$**.

Another interesting example to consider is when $f=1_{A}$ the indicator function for some set $A$ formally defined as $$1_{A}=\begin{cases}1 & x\in A 
\\\\ 0 & x\notin A\end{cases}$$ we see that $$\lim_{N\to \infty} \frac{|\lbrace 1\leq i \leq N \mid T^{i-1}(x) \in A \rbrace|}{N}=\mu(A)$$ i.e. we observe the fraction of times $x$ is enters the set $A$ over time and we see that it converges to the measure of the set. This implies that for every set $A$ of non-zero measure and some configuration $x$ there exists some time $n$ for which $T^{n}(x)\in A$ ([Poincaré recurrence theorem](https://en.wikipedia.org/wiki/Poincar%C3%A9_recurrence_theorem)).

### Key intuition
We could think of invariant functions as the kernel space of $\mathrm{id} - U$ where $U(f) = f\circ T$ is some operator acting of functions. It seems natural to consider the image space of $\mathrm{id} - U$, that is functions of the form $g-g\circ T$ for $g\in L^2$ we will call this subspace $\mathcal{C}$ (also called the coboundary functions). The time average of the function $g-g\circ T$ is a telescoping sum $$\frac{1}{N}\sum_{i=1}^{N}g(T^{i-1}x)-g(T^{i}x)=\frac{1}{N}(g(x)-g(T^{N}x)),$$ so $$\frac{1}{N}\left\Vert g(x)-g(T^{N}x) \right\Vert_2 \leq \frac{2}{N}\left\Vert g\right\Vert_2 \overset{N\to \infty}{\longrightarrow} 0.$$

So the time average of $g-g\circ T$ converges in $L^2$ to $0$.

**Insight 2: functions in $L^2$ can be decomposed into the sum of an invariant function and a coboundary function**

{{< details "Technical comment (not important...)" >}}
It is easy to show that this also holds for functions in the closure of $\bar{\mathcal{C}}.$ We now want to show that $L^2$ can be decomposed into $\overline{\lbrace\text{invariant functions}\rbrace +\mathcal{C}}$. The reason we care about the closure of the space is that $\mathcal{C}$ is not necessarily closed.
{{< /details >}}

### Technical part of the proof
Obviously a function which is both invariant and in $\mathcal{C}$ must be the zero function, thus the sets are disjoint. 

Assume that there exists non-zero function $f$ which is orthogonal to $\lbrace\text{invariant functions}\rbrace + \bar{\mathcal{C}}$. Thus $f$ is orthogonal to $f-f\circ T$, $$\left \Vert f-f\circ T\right \Vert_{2}^{2} = \left \Vert f \right \Vert_{2}^{2} +  \left \Vert f \circ T \right \Vert_{2}^{2} - 2\langle f, f\circ T \rangle$$ since $T$ is measure preserving, it follows from a simple argument about [simple functions](https://en.wikipedia.org/wiki/Simple_function) that $\left \Vert f \right \Vert_{2}^{2} =  \left \Vert f \circ T \right \Vert_{2}^{2} =  \langle f \circ T, f\circ T \rangle$ plugging back in we see that $$\left \Vert f-f\circ T\right \Vert_{2}^{2} = 2\langle f\circ T - f, f\circ T \rangle = 0.$$ Thus, $f=f\circ T$, by definition this means that $f$ is invariant contrary to our assumption that $f$ is orthogonal to the $\lbrace\text{invariant functions}\rbrace$.

This means that any function $f$ in $L^2$ can be written as a some of two functions: one which is invariant and remains constant after computing its time average and another one which converges in $L^2$ norm to $0$. Thus, the time-average of $f$ converges to an invariant function, say $\overline{f}$. 


As we previously saw in the lemma, this function must be constant. Which constant?

### Proving that the time-average and phase-average equal 
**Insight 3: The limit function $\overline{f}$ can be expressed as the inner product $\langle \overline{f}, 1\rangle.$**


We know that $$\overline{f} = \int_{\mathcal{X}}\overline{f}d\mu$$ an alternative way to compute this integral is to compute the inner product $$\langle \overline{f}, 1\rangle$$ Combining with the fact that $$\frac{1}{N}\sum_{i=1}^{N}f\circ T^{i-1}\longrightarrow \overline{f}$$ we see that $$\overline{f} = \left \langle \lim_{N\to \infty}\frac{1}{N}\sum_{i=1}^{N}f\circ T^{i-1}, 1\right \rangle$$ and by linearity of inner product $$\overline{f} = \lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N}\left \langle f\circ T^{i-1}, 1\right \rangle$$ using the fact that $T$ is measure preserving and therefore preserves inner products we get our desired result $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x) \overset{L^2}{\longrightarrow} \int_{\mathcal{X}}{fd\mu}.$$

## Pointwise Ergodic theorem (Birkhoff `32)
One year after Von Neumann proved the mean ergodic theorem, Birkhoff discovered a similar result. It states that for a function in $L^2$, $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=\int_{\mathcal{X}} f(x)d\mu$$ notice that convergence here is pointwise.


In Kolmogorov's interpretation of probability - random variables are essentially functions $f_{i}:\mathcal{X}\to \mathbb{R}$. The law of large numbers states that for any collection of identitically distributed variables $f_{1}, f_{2}, \dots, f_{N}$ (with the same distribution as $f$) their mean converges to $f$ $$\frac{f_{1}+f_{2}+\dots+f_{N}}{N}\longrightarrow \mathbb{E}[f].$$ We can view ergodicity as a condition for generating "random" behaviour.  Birkhoff's theorem shows us that ergodicity can give us another estimate for the expectation of $f$. 
so evaluating $$\mathbb{E}[f]=\int_{\mathcal{X}}f(x)d\mu$$ is equivalent to sampling $x\in \mathcal{X}$ arbitrarily and computing $$\frac{x+f(T(x))+\dots+f(T^{n-1}(x))}{N},$$ notice how this expression is totally deterministic whereas sampling i.i.d. variables requires us to assume we have some randomness. 

In some sense, **ergodic systems give rise to "random" behaviour**.
