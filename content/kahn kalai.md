---
author: "Eitan Porat"
title: "A Note on the Kahn-Kalai Conjecture"
date: "2023-03-18"
description: "The Park-Pham Theorem gives us a tool for calculating the thresholds of graph properties. In this blog post we attempt to give a clear explanation of the proof, focusing on intuition and concrete examples. v2"
tags: ["random graphs"]
ShowToc: true
ShowBreadCrumbs: false
math: true
align: center
collapse: true
---
## Erdős–Rényi Model - a random graph model
The Erdős–Rényi model in probability theory is a model for generating random graphs. 

There are two closely related variants of Erdős–Rényi models. In the $G(n,M)$ a graph is chosen uniformly at random from the collection of graphs which have $n$ nodes and $M$ edges. In the $G(n,p)$ model, a graph on $n$ vertices is constructed by randomly adding edges with probability $p$. 
We sometimes view these graphs as subsets of $\lbrace 0,1\rbrace^{\begin{pmatrix}[n] \\\2
\end{pmatrix}}$, where the edges are randomly selected from the set $$\begin{pmatrix}[n] \\\2\end{pmatrix} = \lbrace \lbrace a,b\rbrace \mid 1\leq a < b \leq n\rbrace.$$

This models are closely related because by the law of large numbers $G(n,p)$ should behave similarly to $G(n,M)$ where $M=\begin{pmatrix}n \\\2\end{pmatrix}p$.

## Monotone Properties
The behaviour of these random graphs are studied often in the regime where the number of nodes tends to infinity. This behaviour is usually studied in the context of monotone properties. 

A property $\mathcal{G} \subseteq \lbrace 0,1\rbrace ^{\begin{pmatrix}[n] \\\2 \end{pmatrix}}$ is called monotone if for any two graphs $G,H$ such that $G \in \mathcal{G}$ and $G \subseteq H$, then $H \in \mathcal{G}.$ 

### Thresholds for Monotone Properties
Consider the monotone property of connectivity in the  Erdős–Rényi model. It is known that if $p<\frac{(1-\varepsilon)\ln{n}}{n}$, then $G\sim G(n,p)$ almost surely is **disconnected** and if $p>\frac{(1+\varepsilon)\ln{n}}{n}$, then $G\sim G(n,p)$ almost surely is **connected**. In this case, $\Theta(\frac{\ln{n}}{n})$ is called a *threshold* for the monotone property of connectivity, formally the threshold of a property $\mathcal{G}$ is defined to be the probability $p_{c}(\mathcal{G})$ for which $\Pr_{G\sim G(n,p_{c})}(G \in \mathcal{G})=\frac{1}{2}.$

## Threshold for Triangles in a random graph

### Lower Bound via Expectation
Consider the monotone property: $G$ contains a triangle, that is an unordered triples $\lbrace i, j, k \rbrace$ such that $\lbrace i, j \rbrace$, $\lbrace j, k \rbrace$, and $\lbrace k, i \rbrace$ are edges in $G$.
We wish to compute $$\Pr_{G\sim G(n,p)}(G \text { contains a triangle}).$$ Let $N_\triangle(G)$ be the number of triangles in $G$. Then, $$\Pr_{G\sim G(n,p)}(G \text { contains a triangle}) = \Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1).$$ We can rewrite the latter term using the expectation instead $$\begin{aligned}\Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1) &= \mathbb{E}[1_{N_\triangle(G) \geq 1}] \\\\ &\leq \mathbb{E}[N_\triangle(G) 1_{N_\triangle(G) \geq 1}]\\\\ & =\mathbb{E}[N_\triangle(G)]\end{aligned} $$ This argument is called Markov's Inequality. Using Linearity of Expectation, it is easy to compute $\mathbb{E}[N_\triangle(G)]$. $$N_\triangle(G)=\sum_{i<j<k}{X_{abc}}(G)$$
where $X_{abc}$ is $1$ if the triangle $abc$ is contained in $G$ and $0$ otherwise. $$\begin{aligned}\mathbb{E}[N_\triangle(G)] &= \mathbb{E}\left[\sum_{a<b<c}{X_{abc}(G)}\right] \\\\&= \sum_{i<j<k}{\mathbb{E}[X_{abc}(G)]} \\\\&= \begin{pmatrix} n \\\\ 3 \end{pmatrix}p^3\end{aligned}  $$ From this it is clear that for $p = n^{-1}$, $$\begin{aligned}\Pr_{G\sim G(n,p)}(G \text{ contains a triangle}) &\leq \mathbb{E}[N_\triangle(G)] \\\\ &= \begin{pmatrix}n \\\\ 3 \end{pmatrix}n^{-3} \longrightarrow \frac{1}{6}\end{aligned} $$

Since the probability that $G$ contains a triangle increases with $p$ we know that $p_{c}(\triangle) = \Omega(n^{-1}).$

### Upper Bound via Second Moment Method
To compute an upper bound on $p_{c}$ we need to compute a lower bound on $\Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1)$. 

The second moment method allows us to compute lower bounds on $\Pr(X > 0)$ using $\mathbb{E}[X]$ (the first moment) and $\mathbb{E}[X^{2}].$ Intuitively, if $X$ has a high mean and a low variance, then it is positive with high probability. $$\begin{aligned}\mathbb{E}[X] &= \mathbb{E}[X 1_{X>0}] \leq \sqrt{\mathbb{E}[X^{2}]}\sqrt{\Pr(X>0)}\end{aligned}$$ Thus $$\Pr(X>0) \geq \frac{\mathbb{E}[X]^2}{\mathbb{E}[X^2]}.$$ For $X=N_\triangle(G)$, $$\begin{aligned}\mathbb{E}[N_\triangle(G)^{2}] &= \mathbb{E}\left[\left(\sum_{abc}{X_{abc}}\right)^2\right]\\\\ &= \sum_{abc}\sum_{abc}{\mathbb{E}[X_{abc}X_{def}]}.\end{aligned}$$ 
* If the triangle $abc$ and the triangle $def$ don't share any edges $X_{abc}$ and $X_{def}$ are independent random variable, then $$\mathbb{E}[X_{abc} X_{def}] = \mathbb{E}[X_{abc}]\mathbb{E}[X_{def}] = p^6.$$ There are $\begin{pmatrix}n \\\\ 6\end{pmatrix}\begin{pmatrix}6 \\\\ 3\end{pmatrix} \sim \frac{1}{36} n^{6}$ such terms.
* If $ijk$ and $abc$ share one edge, then $$\mathbb{E}[X_{ijk} X_{abc}] = p^4.$$ There are $\begin{pmatrix}n \\\\ 4\end{pmatrix}\begin{pmatrix}4 \\\\ 3\end{pmatrix} \sim \frac{1}{6}n^{4}$ such terms.
* If $ijk$ are $abc$ share two edges (in other words, are identical), then $$\mathbb{E}[X_{ijk}X_{abc}] = p^{3}.$$ There are $\sim \frac{1}{6} n^3$ such terms.

Thus, $$\Pr(N_\triangle(G)\geq 1) \geq \frac{\frac{1}{36}(np)^6}{\frac{1}{36}(np)^6 + \frac{1}{6}(np)^4 + \frac{1}{6}(np)^3}$$ for some constant $C$ and $p=Cn^{-1}$, $$\Pr(N_\triangle(G)\geq 1)\geq \frac{1}{2},$$ hence $p_c = O(n^{-1}).$

### $n^{-1}$ is the threshold for triangles
In this example, the threshold we using the expectation bound is tight (up to a constant).

We could try to use this method for other monotone properties such as connectivity. For connectivity, the expectation bound gives us $p = n^{-1}$ which is not tight, as the real threshold is $\Theta(\frac{\ln n}{n})$. **Kahn and Kalai conjectured that the threshold from the expectation bound is tight up to a logarithmic term in $n$**.

## Kahn-Kalai Conjecture
Every monotone property $\mathcal{G}$ is defined by some set of minimal elements $\mathcal{S}$, we say the $\mathcal{G} = \langle \mathcal{S} \rangle$, if $$\mathcal{G} = \lbrace F \mid \exists S\in \mathcal{S} \quad S \subseteq F\rbrace$$ For example in the context of connectivity, the minimal elements are the trees on $n$ vertices, and in the context of triangles the minimal elements are all the different triangles. 

If we define $N_\mathcal{S}(G)$ to be the number of elements in $\mathcal{S}$ contained in $G$ then $$\mathbb{E}[N_\mathcal{S}(G)] = \sum_{S\in \mathcal{S}}{p^{|S|}} = \mathrm{cost_p}(\mathcal{S})$$ by linearity of expectation. By Markov's Inequality, $$\Pr(G\in \mathcal{G})=\Pr(N_\mathcal{S}(G)\geq 1)\leq \mathbb{E}[N_\mathcal{S}(G)],$$ If $\mathbb{E}[N_\mathcal{S}(G)] = \frac{1}{2},$ then $\Pr(G \in \mathcal{G}) \leq \frac{1}{2}.$ Note that this is true even if $S$ contains elements that are even smaller than the minimal elements of $\mathcal{G}$, i.e. $\mathcal{G} \subseteq \langle \mathcal{S} \rangle$ (we say in this case that $\mathcal{S}$ covers $\mathcal{G}$). This motivates the following definition, let $$q(\mathcal{G}) = \max\left\lbrace p \mid \exists \mathcal{S} \quad \mathcal{G} \subseteq \langle \mathcal{S} \rangle \quad \mathrm{cost_p}(\mathcal{S}) = \frac{1}{2}\right\rbrace$$ This defines the tightest lower bound on the threshold given by the expectation computation, i.e. $q(\mathcal{G})\leq p_{c}(\mathcal{G})$. The **Kahn-Kalai Conjecture** (Proved by Park-Pham in 2022) states that $q(\mathcal{G})$ also yields an upper bound given by $$p_{c}(\mathcal{G}) < K q(\mathcal{G})\log (\ell(\mathcal{G}) + 1),$$ where $K>0$ is some universal constant and $\ell(\mathcal{G})$ is the largest minimal element of $\mathcal{G}$.

## Park-Pham Theorem
To prove the upper bound we will prove that $$\frac{p_{c}(\mathcal{G})}{64\log(\ell(\mathcal{G}) + 1)} < q(\mathcal{G})$$ Denote $q' = \frac{p_{c}(\mathcal{G})}{64\log(\ell(\mathcal{G}) + 1)}$, we show that for there exist $\mathcal{S}$ which covers $\mathcal{G}$ and $$\mathbb{E}[N_{\mathcal{S}}(G)]=\mathrm{cost_{q'}}(\mathcal{S}) < \frac{1}{2}.$$ 

$\mathcal{S}$ is constructed using the probabilistic method. We show that there exists a family of sets such that:

1. $\mathcal{S}$ covers $\mathcal{G}$:
$$\Pr_{\mathcal{S}}(\mathcal{G} \subseteq \langle \mathcal{S} \rangle ) \geq \frac{1}{4}.$$

2. $\mathcal{S}$ has small cost:
$$\Pr_{\mathcal{S}}\left(\mathrm{cost_{q'}}(\mathcal{S}) < \frac{1}{2}\right) > \frac{3}{4}.$$

Combining 1 and 2 by union bound, $$\Pr_{\mathcal{S}}\left(\mathcal{G} \subseteq \langle \mathcal{S} \rangle \text{ and }\mathrm{cost_{q'}}(\mathcal{S}) < \frac{1}{2}\right) > 0$$ and via the probabilistic method, there is some choice for $\mathcal{S}$ that covers $\mathcal{G}$ and achieves a small cost $\mathrm{cost_{q'}}(\mathcal{S}) < \frac{1}{2}$.

## An algorithm for constructing small covers
