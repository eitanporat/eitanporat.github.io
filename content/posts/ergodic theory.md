---
author: "Eitan Porat"
title: "The Ergodic Theorem"
date: "2023-03-18"
description: "What is Ergodic Theory? In this post, I present some wonderful and intuitive proofs for the ergodic theorems and describe two applications of the ergodic theorem."
tags: ["ergodic theory"]
ShowToc: true
ShowBreadCrumbs: false
math: true
align: center
collapse: true
---
## Introduction
Suppose you want to model the dynamics of a gas inside a box. We model the gas as a bunch of molecules, which can hit each other and the box they are enclosed in. We consider the situation in which there is no loss of energy (elastic collisions, friction, heat, etc.).

![Particles in a box](https://media.tenor.com/2LDOAuu4_TAAAAAd/physics-particles.gif#center)

We can write physical equations of motions to model this gas. The problem is that the number of balls is enormous, and we cannot describe the position and momentum of each particle. Nor can we solve these equations efficiently. What we can do is observe some macroscopic physical quantity of the physical system (such as *temperature*, *heat capacity*, etc.). 

In mathematical terms, we have $N$ particles with positions $q_{1},q_{2},\dots,q_{N}$ (each 3-dimensional vectors) which momenta $p_{1},p_{2},\dots,p_{N}$ (also 3-dimensional vectors). We can collect all variables into a single variable $$x=(q_{1},q_{2},\dots,q_{N},p_{1},p_{2},\dots,p_{N}),$$ the state of the system. What we are interested in measuring is $f(x)$. But since molecules move very quickly $\approx 500 m/sec$, we assume that the period it takes to take a physical measurement is actually a long time for the molecules. That is, assuming that the system evolves at time $t$ as $P_t(x)$ we are actually measuring $$\frac{1}{\tau}\int_{0}^{\tau} f(P_{t}(x))dt,$$ where $\tau$ is the period of time it takes to take a physical measurement. But as we assumed $\tau$ is large (since each molecule moves so quickly), it is safe to assume we are measuring  $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} f(P_{t}(x))dt$$ Suppose the system has a fixed energy $C$. What the ergodic theorem states is that $$\lim_{\tau \to \infty} \frac{1}{\tau}\int_{0}^{\tau} f(P_{t}(x))dt=\int_{\mathcal{X}}{f(x)d\mu},$$ where $$\mathcal{X} = \lbrace x\mid E(x)=C\rbrace $$ a (compact) manifold of states with energy $C$ and $\mu$ which is the uniform measure (say Borel) over all states in the manifold.

Intuitively, this means that taking a time-average measurement of a physical quantity is equivalent to an average of the physical quantity over all possible states.

<!-- ## Goal of this post
\mathcal{X}y goal for the rest of the post is to prove this theorem and some close variants which were discovered around the same time. We will prove the discretized versions of the theorem. -->

## Formalizing even further
At this point we moved from a theoretical understanding of the subject to a mathematical perspective, we are trying to capture the essential conditions for which the ergodic theorem is true. We are trying to develop a useful framework that will allow us to generalize even further. 

In general, we are given some space $\mathcal{X}$ (a set), with some transformation $T$ (remember the time evolution operator $P_{t}$ we saw before). What might this transformation be in general?

Consider an ensemble of particles each with position $x$ and momentum $p$. The area of the blue pixels (the phase-space distribution) is constant along the time-evolution of the system. This result is known as [Liouville's theorem](https://en.wikipedia.org/wiki/Liouville%27s_theorem_(Hamiltonian)).
![Louville theorem](https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamiltonian_flow_classical.gif#center)

Ah-ha! This transformation must preserve the volume of the phase space (the space of positions and momenta). 

To capture this notion, we define a measure $\mu$ to be a function which takes as input sets and returns values between $[0,1]$. This function has some other properties, such as $\mu(\emptyset)=0$ and $\mu(\mathcal{X})=1$, and $\mu\left(\bigcup_{i}A_{i}\right)=\sum_{i}\mu(A_{i})$ for a countable collection of disjoint sets $\lbrace A_{1}, A_{2}, .... \rbrace$. [Click here for a more rigorous definition](https://en.wikipedia.org/wiki/Measure_%28mathematics%29). 

The measure needs to be $T$-preserving in the sense that for every measurable set $E$ we have $$\mu(E)=\mu(T^{-1}E).$$ 
a not very important aside... the reason we write $T^{-1}$ and not $T$ is for technical reasons ($T$ might not be invertible in general).

A system is said to be *ergodic* if there are no stationary sets except for sets which are of zero-measure or complements of sets of zero measure i.e. if $T^{-1}(E)=E$ then $\mu(E)=0$ or $\mu(\mathcal{X}\setminus E)=0$. In other words, a set can be *stationary* only if it is "almost everything" or "almost nothing". 

We could imagine that the gas molecules are never confined to a specific part of the phase space, for example a smoke inside a room might eventually fills the room. It is worth noting that for most physical systems, we don't know whether they are ergodic or not and we usually assume that this is true.

## Proof of the Mean-Ergodic Theorem (Von Neumann `31)
We will start by proving the mean-ergodic theorem which is an easier variant to prove than the one states earlier.

For the proof of the mean ergodic theorem we only consider functions which are in $L^2$ this means that $$\int_{\mathcal{X}}|f(x)|^{2}d\mu < \infty.$$ These functions form a Hilbert space, which is useful because we can apply some of our intuitions from linear algebra to these sorts of spaces. Such as the notion of inner product $$\langle f,g \rangle = \int_{\mathcal{X}}f(x)g(x)d\mu.$$ We will prove a discrete version of the mean ergodic theorem that is 
$$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f\circ T^{i-1} \overset{L^2}{\longrightarrow}\int_{\mathcal{X}}{f d\mu},$$ important to note that this is not pointwise convergencebut rather in $L^2$ (which is a less strict requirement).


### An important lemma - invariant functions are constant ([almost everywhere](https://en.wikipedia.org/wiki/Almost_everywhere))!
In ergodic systems, $T$-invariant functions (a.e.) are constant (a.e.). Let $f$ be a function such that $f=f\circ T$ (a.e.). Consider the set $[f>t]$ that is $\lbrace x \mid f(x) > t \rbrace$. The preimage of $[f>t]$ under $T$ is $$T^{-1}[f>t] = \lbrace x \mid f\circ T(x) > t \rbrace = \lbrace x \mid f(x) > t \rbrace = [f>t].$$

By ergodicity, $\mu([f>t])=0$ or $\mu([f>t])=1$ and $\mu([f>t])$ is monotonically decreasing so there must be some critical value $t^\ast$ for which $\mu([f>t^\ast])=0$ but $\mu([f>t])=1$ for every $t < t^\ast$, so $f$ is constant and equal to $t^\ast$ (up to a set of zero measure).

![Figure](https://i.imgur.com/RFfw5LV.png)
### Invariant functions
A trivial case to consider is when $f=f\circ T$ that is $f$ is $T$-invariant, we know in this case that $f$ is constant. In this case it is obvious that $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=f(x)=\int f(x)d\mu$$

**Insight 1: the time-average of a $T$-invariant function $f$ converges to the function $f$**.

### Key intuition
We could think of invariant functions as the kernel space of $\mathrm{id} - U$ where $U(f) = f\circ T$ is some operator acting of functions. It seems natural to consider the image space of $\mathrm{id} - U$, that is functions of the form $g-g\circ T$ for $g\in L^2$ we will call this subspace $\mathcal{C}$ (also called the coboundary functions). The time average of the function $g-g\circ T$ is a telescoping sum $$\frac{1}{N}\sum_{i=1}^{N}g(T^{i-1}x)-g(T^{i}x)=\frac{1}{N}(g(x)-g(T^{N}x)),$$ so $$\frac{1}{N}\left\Vert g(x)-g(T^{N}x) \right\Vert_2 \leq \frac{2}{N}\left\Vert g\right\Vert_2 \overset{N\to \infty}{\longrightarrow} 0.$$

So the time average of $g-g\circ T$ converges in $L^2$ to $0$. This makes sense since the measurement of observed physical quantities don't change drastically after infinitesimal time steps.

**Insight 2: functions in $L^2$ can be decomposed into the sum of an invariant function and a coboundary function**

{{< details "Technical comment (not important...)" >}}
It is easy to show that this also holds for functions in the closure of $\bar{\mathcal{C}}.$ We now want to show that $L^2$ can be decomposed into $\lbrace\text{invariant functions}\rbrace +\overline{\mathcal{C}}$. The reason we care about the closure of the space is that $\mathcal{C}$ is not necessarily closed.
{{< /details >}}

### Technical part of the proof
Obviously a function which is both invariant and in $\mathcal{C}$ must be the zero function, thus the sets are disjoint. 

Assume that there exists non-zero function $f$ which is orthogonal to $\lbrace\text{invariant functions}\rbrace + \bar{\mathcal{C}}$. Thus $f$ is orthogonal to $f-f\circ T$, $$\left \Vert f-f\circ T\right \Vert_{2}^{2} = \left \Vert f \right \Vert_{2}^{2} +  \left \Vert f \circ T \right \Vert_{2}^{2} - 2\langle f, f\circ T \rangle$$ since $T$ is measure preserving, it follows from a simple argument about [simple functions](https://en.wikipedia.org/wiki/Simple_function) that $\left \Vert f \right \Vert_{2}^{2} =  \left \Vert f \circ T \right \Vert_{2}^{2}$ plugging back in we see that $$\left \Vert f-f\circ T\right \Vert_{2}^{2} = 2\langle f, f - f\circ T \rangle = 0.$$ Thus, $f=f\circ T$, by definition this means that $f$ is invariant contrary to our assumption that $f$ is orthogonal to the $\lbrace\text{invariant functions}\rbrace$.

This means that any function $f$ in $L^2$ can be written as a some of two functions: one which is invariant and remains constant after computing its time average and another one which converges in $L^2$ norm to $0$. Thus, the time-average of $f$ converges to an invariant function, say $\overline{f}$. 


As we saw previously in the lemma, this function must be constant. Which constant?

### Proving that the time-average and phase-average are equal 

#### Explanation 1

Since $\bar{f}$ is constant a.e., $$\overline{f} = \int_{\mathcal{X}}\overline{f}d\mu$$ an alternative way to compute this integral is to compute the inner product $$\langle \overline{f}, 1\rangle$$ Combining with the fact that $$\frac{1}{N}\sum_{i=1}^{N}f\circ T^{i-1}\longrightarrow \overline{f}$$ we see that $$\overline{f} = \left \langle \lim_{N\to \infty}\frac{1}{N}\sum_{i=1}^{N}f\circ T^{i-1}, 1\right \rangle$$ and by linearity of inner product $$\overline{f} = \lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N}\left \langle f\circ T^{i-1}, 1\right \rangle$$ using the fact that $T$ is measure preserving and therefore preserves inner products we get our desired result $$\frac{1}{N}\sum_{i=1}^{N} \int f(T^{i-1}x) d\mu = \int_{\mathcal{X}}{fd\mu} = \bar{f}$$
$\blacksquare$
#### Explanation 2
Another intuition is that we might think of $\bar{f}$ as a projection of $f$ on the space of invariant functions (constant almost everywhere). $$\bar{f} = \arg\min_{\alpha \in \mathbb{R}}{\left \Vert f-\alpha \right \Vert_{2}},$$ from [Gauss-Markov Theorem](https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem) the constant which minimizes the $L^2$ loss function is the mean of $f$, $\int_{\mathcal{X}} f d\mu$. 
## Pointwise Ergodic theorem (Birkhoff `32)
One year after Von Neumann proved the mean ergodic theorem, Birkhoff discovered a similar result. It states that for a function in $L^1$ ($\int_{\mathcal{X}}|f(x)|d\mu < \infty$) $$\lim_{N\to \infty} \frac{1}{N}\sum_{i=1}^{N} f(T^{i-1}x)=\int_{\mathcal{X}} f(x)d\mu$$ almost everywhere. Notice that convergence here is pointwise.


In Kolmogorov's interpretation of probability - random variables are essentially functions $f_{i}:\mathcal{X}\to \mathbb{R}$. The law of large numbers states that for any collection of identically distributed variables $f_{1}, f_{2}, \dots, f_{N}$ (with the same distribution as $f$) their mean converges to $f$ $$\frac{f_{1}+f_{2}+\dots+f_{N}}{N}\longrightarrow \mathbb{E}[f].$$ We can view ergodicity as a condition for generating "random" behaviour.  Birkhoff's theorem shows us that ergodicity can give us another estimate for the expectation of $f$. 
so evaluating $$\mathbb{E}[f]=\int_{\mathcal{X}}f(x)d\mu$$ is equivalent to sampling $x\in \mathcal{X}$ arbitrarily and computing $$\frac{x+f(T(x))+\dots+f(T^{n-1}(x))}{N},$$ notice how this expression is totally deterministic whereas sampling i.i.d. variables requires us to assume we have some randomness. 

In some sense, **ergodic systems give rise to "random" behaviour**. 


### Proof of the Pointwise Ergodic theorem
> This proof is somewhat more complicated than the previous one, I hope the illustration helps explain the underlying construction.

For every $x\in \mathcal{X}$ consider the series $$A_{n}(x) = \frac{1}{n}\sum_{i=1}^{n}{f(T^{i-1}x)}$$ our goal is to prove that almost everywhere $$\lim_{n\to \infty}A_{n}(x)\longrightarrow \int_{\mathcal{X}}f(x)d\mu.$$

### Some preliminary preparations
Any function $f \in L^1$ may be decomposed into two functions $f = f_{+} - f_{-}$ which are each non-negative. If we prove that the theorem holds for $f_{+}$ and $f_{-}$ individually from linearity we will conclude that the theorem hold. We may assume henceforth that $f$ is non-negative. 

The limsup of a sequence always exists, let's denote $$\bar{A}(x)=\lim_{n\to \infty}\sup A_{n}(x)$$ at this moment we don't know that $A_{n}(x)$ is bounded, so $\bar{A}(x) \in [0, \infty]$, we may even drop the argument and write $\bar{A}$ instead of $\bar{A}(x)$ since $\bar{A}(x)$ is constant almost everywhere.

{{< details "Proof that $\bar{A}$ is constant almost everywhere." >}}
>
>Notice that $$A_{n}(T(x)) = \frac{1}{n}\sum_{i=1}^{n}{f(T^i x)}$$ and so $A_{n}(T(x))$ and $A_{n}(x)$ differ by two terms i.e. $$A_{n}(T(x)) - A_{n}(x) = \frac{f(T^n x)}{n} - \frac{f(x)}{n}$$ as $n$ grows $\frac{f(x)}{n}$ tends to zero. What is less obvious to show is that $\frac{f(T^n x)}{n}$ tends to zero. 
>
>Let $\varepsilon > 0$ since $T$ is measure-preserving $$\mu\left(\frac{f(T^{n}x)}{n} \geq \varepsilon\right) = \mu(f(x) \geq n\varepsilon)$$ using a Markov-type argument, $$\mu\left(f(T^{n}x) \geq n\varepsilon\right) \leq \frac{\int_{\mathcal{X}}{f(x)d\mu}}{n \varepsilon}\overset{n\to \infty}{\longrightarrow} 0$$
>
>This proves that $\bar{A}(x)$ is $T$ invariant almost everywhere, and by the important lemma we see that $\bar{A}(x)$ is constant. $\blacksquare$
>
{{</details>}}
‎  

### The proof outline
The proof consists of two parts. 

The first part of the proof is to establish why the limit $\lim_{n\to \infty}A_{n}(x)$ exists almost everywhere, we will show this by equating the limsup and liminf of $A_{n}(x)$ $$\lim_{n\to \infty}\sup A_{n}(x)=\lim_{n\to \infty}\inf A_{n}(x).$$

For any arbitrary $\alpha < \bar{A}$, we will prove that $$\lim_{n\to \infty}\inf A_{n}(x) \geq \alpha$$ and this implies that $$\lim_{n\to \infty} \inf A_{n}(x) \geq \lim_{n \to \infty} \sup A_{n}(x)$$ since the limit inferior is always less than or equal to the limit supremum this would imply that $$\lim_{n\to \infty}\inf A_{n}(x) = \lim_{n\to \infty}\sup A_{n}(x)$$ so the pointwise limit exists.

In the second part of the proof we show that $\bar{A}=\int_{\mathcal{X}}fd\mu$

## Part 1

### Warmup
The condition that $\alpha < \bar{A}$ implies that there for almost every $x$ there exists a minimum $\ell(x)$ such that $A_{\ell}(x) > \alpha$.

**Insight 1: Long enough subsequences have an average $f$ value which exceeds $\alpha$**
What does this mean? It means that starting from any $x$ there exists $\ell(x)$ such that $$\frac{1}{\ell(x)}\left(f(x) + f(Tx)+\dots + f(T^{\ell(x) - 1} x)\right) > \alpha.$$ 
**Insight 2: We can decompose the sequence $x, T(x), T^2(x), \dots, T^{n-1}(x)$ into subsequences which each has an average value greater than $\alpha$.**
Let's see what this means pictorially.

![Figure](https://i.imgur.com/asYepNK.png)

Each subsequence has average value greater than $\alpha$.
The sequence is precisely defined as $$\begin{aligned}k_{0} &= \ell(x) \\\\ k_{1} &= k_{0} + \ell(T^{k_0}x) \\\\ k_{2} &= k_{1} + \ell(T^{k_{1}}x) \\\\ \vdots \\\\ k_{i} &= k_{i-1} + \ell(T^{k_{i-1}}x)\end{aligned}$$

If we assume that $\ell(T^k x) \leq L$ for every $k$ we can approximately cover $x, T(x), T^2(x), \dots, T^{n-1}(x)$ with an exception to the end point ($k_i$ might not necessarily equal $n-1$, we will assume that $n-L \leq k_{i} \leq n$) and so $$\begin{aligned}A_{n}(x) &= \frac{f(x) + f(T(x)) + \dots + f(T^{n-1} x)}{n} \\\\ &\geq \frac{f(x) + f(T(x)) + \dots + f(T^{k_{0} - 1}x)}{n} \\\\ &+ \frac{f(T^{k_{0}}x) + \dots + f(T^{k_{1} - 1}x)}{n} + \dots + \frac{f(T^{k_{i-1}}x) + \dots + f(T^{k_{i} - 1}x)}{n}\\\\ &=\frac{A_{k_0}(x)\cdot k_{0}}{n} + \frac{A_{k_1}(T^{k_{0}} x) \cdot k_{1}}{n} + ... + \frac{A_{k_{i}}(T^{k_{i-1}} x) \cdot k_{i}}{n}\\\\ &\geq \frac{\alpha(k_{0} + \dots + k_{i})}{n} \\\\ &\geq \alpha\frac{n-L}{n} \end{aligned} $$ As $n \rightarrow \infty$, $$\lim_{n\to \infty}\inf A_{n}(x) \geq \alpha.$$ So the limit exists! 

### Back to the general case
How do we eliminate the assumption that  $\ell(T^k x) \leq L$ for every $k$? 

**Insight 3: We could assume that $\ell(x) \leq L$ almost everywhere.**

Why can we assume that?

Let $\varepsilon>0$ be a very small constant. Since $\ell(x)$ is finite almost everywhere there exists some $L$ for which $\mu\lbrace \ell(x) > L \rbrace < \varepsilon$.

### Defining the bounded function $\tilde{f}$
We can now define a new function $\tilde{f}$ which is defined in the following way $$\tilde{f}(x) = \begin{cases}f(x) & \ell(x)\leq L\\\\ \alpha & \ell(x) > L\end{cases} \geq f(x),$$ similarly, we can define $$\tilde A_n(x) = \frac{1}{n}\sum_{i=1}^{n}\tilde f(T^{i-1}x).$$ Consider the function $$g(x) =  \begin{cases}0 & \ell(x)\leq L\\\\ \alpha - f(x) & \ell(x) > L\end{cases}$$ with time average $$B_{n} = \frac{1}{n}\sum_{i=1}^{n}g(T^{i-1}x)$$ then $\tilde{f} = f(x) + g(x)$ and $\tilde A_{n}(x) = A_{n}(x) + B_{n}(x)$.

We can define similarly $$\tilde{\ell}(x) = \min\lbrace n \mid \tilde A_{n}(x) \geq \alpha \rbrace$$ By definition $$\tilde{\ell}(x) = \begin{cases}\ell(x) & \ell(x)\leq L\\\\ 1 & \ell(x) > L\end{cases}$$ 

What have we done? We introduced a correction term $g(x)$ so that $\tilde{f}$ has bounded $\tilde{\ell}(x)$. 

**Insight 4: We can reduce the case were $\ell(x)$ is unbounded to the case where $\ell(x)$ is bounded**


### A useful inequality
Having reduced to the case that $\tilde{\ell}(x) \leq L$ we can prove as before the inequality $$\tilde A_{n}(x) \geq \frac{n-L}{n}\alpha$$ taking the integral on both sides $$\frac{n-L}{n}\alpha \leq \int_{\mathcal{X}}\tilde A_{n}(x)d\mu = \int_{\mathcal{X}}\frac{1}{n}\sum_{i=1}^{n}\tilde f(T^{i-1}x)d\mu = \int_{\mathcal{X}}\tilde fd\mu$$ since $T$ is measure preserving. $$\int_{\mathcal{X}}fd\mu+\int_{\mathcal{X}}g d\mu=\int_{\mathcal{X}}\tilde{f}d\mu \geq \frac{n-L}{n}\alpha$$ since $g(x) \leq \alpha$ with support $\varepsilon$ we get a lower bound for $\int_{\mathcal{X}}f d\mu$, $$\int_{\mathcal{X}}fd\mu \geq \int_{\mathcal{X}}\tilde{f}d\mu - \varepsilon \alpha \geq \alpha\left(\frac{n-L}{n}-\varepsilon\right)$$ indeed this is true for any $\varepsilon$ and any $\alpha$, and any $n$. By taking $\varepsilon \to 0$, $\alpha \to \bar{A}$ and $n\to \infty$ $$\boxed{ \bar{A} \leq \int_{\mathcal{X}}fd\mu}.$$

This equality holds for any $f\in L^1$! We're very close to proving the first part of the theorem. What remains to prove is that $$\lim_{n\to \infty}\inf A_n(x) \geq \bar{A}.$$ 

### Proving that the limit inferior and superior are equal
Notice how $g \in L^1$ as such, by the useful inequality, $$ \int_{\mathcal{X}}gd\mu \geq \lim_{n\to \infty}\sup \frac{1}{n}\sum_{i=1}^{n}g(T^{i-1}x)$$ having shown that $\int_{\mathcal{X}}gd\mu \leq \alpha\varepsilon,$ $$\lim_{n\to \infty}\sup B_{n}\leq \alpha\varepsilon $$ by reducing to the warmup case, $$\lim\inf\tilde A_n \geq \lim\sup A_n = \bar{A}$$ The well-known inequality $$\lim\inf A_{n} + \lim\sup B_{n} \geq \lim\inf(A_n + B_n) = \lim\inf\tilde A_n $$ provides us a hint for how to prove a lower bound for $\lim \inf A_{n}$. Combining both inequalities we see that $$\lim\inf A_{n} \geq \lim\inf\tilde A_n - \lim\sup B_{n} \geq \bar{A} - \alpha\varepsilon \geq \alpha(1-\varepsilon) $$ taking $\alpha \to \bar{A}$ and $\varepsilon \to 0$ $$\lim\inf A_{n} \geq \bar{A},$$ Proving that the limit $\lim_{n\to \infty} A_{n}(x) = \bar{A}$ exists almost everywhere.

## Part 2
### The bounded case
we can view $A_{n}(x)$ as a bounded sequence of functions which converge pointwise to $\bar{A}$ and by the [bounded convergence theorem](https://en.wikipedia.org/wiki/Dominated_convergence_theorem), $$\int_{\mathcal{X}}fd\mu = \int_{\mathcal{X}}A_n d\mu \overset{n\to \infty}{\longrightarrow} \int_{\mathcal{X}}\bar{A} d\mu = \bar{A}$$

### The unbounded case
We have already shown that for any $f\in L^1$, $\bar{A} \leq \int_{\mathcal{X}}fd\mu$. What remains to show is that $\bar{A} \geq \int_{\mathcal{X}}fd\mu$. 

Let $M\in \mathbb{R}$, consider the bounded function $f\wedge M = \min(f(x), M)$, $$A_{n}(x) \geq \frac{1}{n}\sum_{i=1}^{n}f\wedge M(T^{i-1}x)$$ taking limits of both sides $$\bar{A} \geq \lim_{n\to \infty}\frac{1}{n}\sum_{i=1}^{n}f\wedge M(T^{i-1}x)$$ reducing to the previous case $$\bar{A} \geq \int_{\mathcal{X}}f\wedge M d\mu$$ but since this is true from every $M$, taking $M\to \infty$, $$\boxed{\bar{A} \geq \int_{\mathcal{X}}f d\mu}$$ $\blacksquare$

## Applications of Birkhoff's Theorem
### Gelfand's problem

Gelfand's problem states that the first digit of $$a_n = \left(k^{n}\right)_{n\in \mathbb N}$$

follows the distribution $$P(i) = \log_{10}\left(\frac{i+1}{i}\right)$$ for $k\neq 10^{m}$.

![Benford's Distribution](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Rozklad_benforda.svg/2560px-Rozklad_benforda.svg.png "The distribution of first digits. Each bar represents a digit, and the height of the bar is the percentage of numbers that start with that digit (Credit: Wikipedia)")

Before we prove this fact, we need a lemma about the ergodicity of irrational shifts.

#### Lemma: $T_\alpha(x) \to x + \alpha \mod 1$ is ergodic for $\alpha \notin \mathbb{Q}$ in the measure space $[0,1]$ with uniform measure (Borel measure).
We will prove that there are no $T_\alpha$ invariant functions (in $L^2$) which are not constant a.e. Let $f \in L^2([0,1])$, it has a Fourier representation as series
$$f(x) = \sum_{k\in \mathbb{Z}}{\hat{f}(k)e^{i2\pi k x}},$$ so $$f\circ T(x) = \sum_{k\in \mathbb{Z}}{\hat{f}(k)e^{i2\pi k (x + \alpha)}}$$ setting both expressions equal, since the Fourier basis is an orthogonal set all coefficients are equal so $$e^{i2\pi k x} = e^{i2\pi k(x+\alpha)} = e^{i2\pi k\alpha}e^{i2\pi k x}$$ But since $\alpha$ is irrational $e^{i2\pi k\alpha} \neq 1$ for $k\neq 0$, so $e^{i2\pi k x}=0$, which means $f$ is constant a.e.

Suppose $E$ is a $T$-invariant set, so $T^{-1}(E)=E$ so $x\in E \iff T(x) \in E$. Therefore $1_{E} = 1_{E}\circ T$ which implies that $1_{E}$ is constant almost everywhere so either $\mu(E)=0$ or $\mu(E)=1$, hence the system is ergodic.

> **Advanced comment:**
> $T_\alpha$ is actually *uniquely ergodic*, which means that there exists only one measure $\mu$ for which $T_\alpha$ is invariant. It can be shown that for uniquely ergodic transformations $$\lim_{n\to \infty}A_{n}(x)\longrightarrow \int_{\mathcal{X}}f(x)d\mu.$$ holds *everywhere*.
>
> We don't present a proof for this fact.
#### Proof of Gelfand's Problem


We represent the binary expansion of $x$ as $x_1 \dots x_p$. Notice that $$x_1\cdot 10^{p - 1} \leq x_{1}...x_{p} < (x_1 + 1) \cdot 10^{p-1}$$ taking $\log_{10}$ of both sides $$\log_{10}(x_1) + (p-1) \leq \log_{10}(x) < (\log_{10}(x_1) + 1) + (p-1)$$ and so $$\log_{10}(x_1) \leq \lbrace \log_{10}(x) \rbrace < (\log_{10}(x_1) + 1)$$ Where $\lbrace \log_{10}(x) \rbrace$ is the fractional part of $\log_{10}(x)$. So for any number $x$ that starts with the digit $i$, $$\log_{10}(i) \leq \lbrace \log_{10}(x) \rbrace < (\log_{10}(i) + 1)$$

Consider the number $x$ = $k^n$, $$\log_{10}(x_1) \leq \lbrace n \log_{10}(k) \rbrace < (\log_{10}(x_1) + 1)$$ Consider the action $T(x) \mapsto x + \log_{10}k \mod 1$, $\log_{10}k$ is irrational and so this action is uniquely ergodic with invariant measure which is uniform on $[0,1]$.

Consider the function $f_i(x) = 1_{\log_{10}(i) \leq  x \leq \log_{10}(i + 1)}$ by Birkhoff's theorem (for uniquely ergodic maps), $$P(i) = \Pr(\text{first digit of }k^n\text{ is }i) \\\\ = \lim_{n\to \infty}\frac{1}{n}\sum_{j=1}^{n}f_{i}(T^{j}0) \\\\\longrightarrow \int f_i d\mu = \mu [\log_{10}(i), \log_{10}(i+1)) = \log_{10}\left(\frac{i+1}{i}\right).$$ $\blacksquare$

### Poincaré Recurrence Theorem

Consider the case when $f=1_{A}$ the indicator function for some set $A$, formally defined as $$1_{A}=\begin{cases}1 & x\in A 
\\\\ 0 & x\notin A\end{cases}$$ we see that $$\lim_{N\to \infty} \frac{|\lbrace 1\leq i \leq N \mid T^{i-1}(x) \in A \rbrace|}{N}=\mu(A)$$ i.e. we observe the fraction of times $x$ is enters the set $A$ over time and we see that it converges to the measure of the set. This implies that for every set $A$ of non-zero measure and some configuration $x$ there exists some time $n$ for which $T^{n}(x)\in A$ ([Poincaré recurrence theorem](https://en.wikipedia.org/wiki/Poincar%C3%A9_recurrence_theorem)). The assumption about the system being ergodic can be weakened.

