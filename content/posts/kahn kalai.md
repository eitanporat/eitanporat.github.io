---
author: "Eitan Porat"
title: "A Note on the Kahn-Kalai Conjecture"
date: "2023-03-18"
description: "The Park-Pham Theorem gives us a tool for calculating the thresholds of graph properties. In this blog post we attempt to give a clear explanation of the proof, focusing on intuition and concrete examples."
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
We sometimes view these graphs as subsets of $\lbrace 0,1\rbrace^{\begin{pmatrix}
  [n] \\\
  2
\end{pmatrix}}$, where the edges are randomly selected from the set $$\begin{pmatrix}
  [n] \\\
  2
\end{pmatrix} = \lbrace \lbrace a,b\rbrace \mid 1\leq a < b \leq n\rbrace.$$

This models are closely related because by the law of large numbers $G(n,p)$ should behave similarly to $G(n,
M)$ where $M=\begin{pmatrix}
  n \\\
  2
\end{pmatrix}p$.

## Monotone Properties
The behaviour of these random graphs are studies often in the regime where the number of nodes tends to infinity. This behaviour is usually studies in the context of monotone properties. 

A property $\mathcal{G} \subseteq \lbrace 0,1\rbrace ^{\begin{pmatrix}
  [n] \\\
  2
\end{pmatrix}}$ is called monotone if for any two graphs $G,H$ such that $G \in \mathcal{G}$ and $G \subseteq H$, then $H \in \mathcal{G}.$ 

For example, consider the monotone property of connectivity. It is known that if $p<\frac{(1-\varepsilon)\ln{n}}{n}$, then $G\sim G(n,p)$ almost surely is **disconnected** and if $p>\frac{(1+\varepsilon)\ln{n}}{n}$, then $G\sim G(n,p)$ almost surely is **connected**. In this case, $\Theta(\frac{\ln{n}}{n})$ is a threshold for the monotone property of connectivity, formally $p_{c}(\mathcal{G})$ the threshold of a monotone property is the probability $p_{c}$ for which $\Pr_{G\sim G(n,p_{c})}(G \in \mathcal{G})=\frac{1}{2}.$

## Threshold for Triangles in a random graph

### Lower Bound via Expectation
Consider the monotone property: $G$ contains a triangles, that is an unordered triples $\lbrace i, j, k \rbrace$ such that $\lbrace i, j \rbrace$, $\lbrace j, k \rbrace$, and $\lbrace k, i \rbrace$ are edges in $G$.
We wish to compute $$\Pr_{G\sim G(n,p)}(G \text { contains a triangle}).$$ Let $N_\triangle(G)$ be the number of triangles in $G$. Then, $$\Pr_{G\sim G(n,p)}(G \text { contains a triangle}) = \Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1).$$ We can rewrite the latter term using the expectation instead $$\begin{aligned}\Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1) &= \mathbb{E}[1_{N_\triangle(G) \geq 1}] \\\\
&\leq \mathbb{E}[N_\triangle(G) 1_{N_\triangle(G) \geq 1}]\\\\ & =\mathbb{E}[N_\triangle(G)]\end{aligned} $$ Using linearity of expectation it is easy to compute $\mathbb{E}[N_\triangle(G)]$. $$N_\triangle(G)=\sum_{i<j<k}{X_{abc}}(G)$$
where $X_{abc}$ is $1$ if the triangle $abc$ is contained in $G$ and $0$ otherwise. $$\begin{aligned}\mathbb{E}[N_\triangle(G)] &= \mathbb{E}\left[\sum_{a<b<c}{X_{abc}(G)}\right] \\\\&= \sum_{i<j<k}{\mathbb{E}[X_{abc}(G)]} \\\\&= \begin{pmatrix} n \\\\ 3 \end{pmatrix}p^3\end{aligned}  $$ From this it is clear that for $p = n^{-1}$, $$\begin{aligned}\Pr_{G\sim G(n,p)}(G \text{ contains a triangle}) &\leq \mathbb{E}[N_\triangle(G)] \\\\ &= \begin{pmatrix}n \\\\ 3 \end{pmatrix}n^{-3} \longrightarrow \frac{1}{6}\end{aligned} $$

Since the probability that $G$ contains a triangle increases with $p$ we know that $p_{c}(\triangle) = \Omega(n^{-1}).$

### Upper Bound via Second Moment Method
To compute an upper bound on $p_{c}$ we need to compute a lower bound on $\Pr_{G\sim G(n,p)}(N_\triangle(G) \geq 1)$. 

The second moment method allows us to compute lower bounds on $\Pr(X > 0)$ using $\mathbb{E}[X]$ (the first moment) and $\mathbb{E}[X^{2}].$ Intuitively, if $X$ has a high mean and a low variance, then it is positive with high probability. $$\begin{aligned}\mathbb{E}[X] &= \mathbb{E}[X 1_{X>0}] \leq \sqrt{\mathbb{E}[X^{2}]}\sqrt{\Pr(X>0)}\end{aligned}$$ Thus $$\Pr(X>0) \geq \frac{\mathbb{E}[X]^2}{\mathbb{E}[X^2]}.$$ For $X=N_\triangle(G)$, $$\begin{aligned}\mathbb{E}[N_\triangle(G)^{2}] &= \mathbb{E}\left[\left(\sum_{abc}{X_{abc}}\right)^2\right]\\\\ &= \sum_{abc}\sum_{abc}{\mathbb{E}[X_{abc}X_{def}]}.\end{aligned}$$ 
* If the triangle $abc$ and the triangle $def$ don't share any edges $X_{abc}$ and $X_{def}$ are independent random variable, then $$\mathbb{E}[X_{abc} X_{def}] = \mathbb{E}[X_{abc}]\mathbb{E}[X_{def}] = p^6.$$ There are $\begin{pmatrix}n \\\\ 6\end{pmatrix}\begin{pmatrix}6 \\\\ 3\end{pmatrix} \sim \frac{1}{36} n^{6}$ such terms.
* If $ijk$ and $abc$ share one edge, then $$\mathbb{E}[X_{ijk} X_{abc}] = p^4.$$ There are $\begin{pmatrix}n \\\\ 4\end{pmatrix}\begin{pmatrix}4 \\\\ 3\end{pmatrix} \sim \frac{1}{6}n^{4}$ such terms.
* If $ijk$ are $abc$ share two edges (in other words, are identical), then $$\mathbb{E}[X_{ijk}X_{abc}] = p^{3}.$$ There are $\sim \frac{1}{6} n^3$ such terms.

Thus, $$\Pr(N_\triangle(G)\geq 1) \geq \frac{\frac{1}{36}(np)^6}{\frac{1}{36}(np)^6 + \frac{1}{6}(np)^4 + \frac{1}{6}(np)^3}$$ for some constant $C$ and $p=Cn^{-1}$, $$\Pr(N_\triangle(G)\geq 1)\geq \frac{1}{2},$$ hence $p_c = O(n^{-1}).$

### $n^{-1}$ is the threshold
In this example, the threshold we using the expectation bound is tight (up to a constant). It is not difficult to show that the expectation bound is tight for the property "$G$ contains $H$" where $H$ is some constant-size graph. We could try to use this method for other monotone properties such as connectivity. For connectivity, the expectation bound gives us $p = n^{-1}$ which is not tight the real threshold is $n^{-1}\ln n$. **Kahn and Kalai conjectured that the threshold from the expectation bound is tight up to a logarithmic constant**.

## Kahn-Kalai Conjecture