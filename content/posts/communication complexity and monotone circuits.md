---
author: "Eitan Porat"
title: "A Remarkable Connection Between Communication Complexity and Circuit Depth"
date: "2023-02-26"
description: ""
tags:
ShowToc: true
ShowBreadCrumbs: false
math: true
collapse: true
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


Since circuits are directed graphs we can view them as layered computations. At the first layer we start with the some subset of the input $x \in \lbrace0,1\rbrace^{n}$, and at each layer we apply some "local" computation to nodes from the previous layer. The final layer is usually one node which we call the output of the circuit.

> ![Example of a circuit](https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Three_input_Boolean_circuit.jpg/640px-Three_input_Boolean_circuit.jpg "An example of a circuit with 3 layers.")


The reason why circuits are easier to prove lower bounds than Turing Machines, is that we can easily model the local computation done between consecutive layers. 

In contrast to the time complexity of Turing Machines: we usually quantify the running time of circuits by their number of layers (or depth). Think of the depth of the circuit as the number of consecutive computations performed on the input.

A major caveat is that the size of the circuit cannot be arbitrarily large (!), and we usually want it to be polynomial in the input's size, as we cannot build arbitrarly big circuits.

We know how to prove non-uniform circuit lower bounds for some specific functions (such as parity), but in general we don't know how this could done.

<!-- ##### [For more information about how depth and size of circuits relate to Turing machines]() -->


## Monotone Functions and Circuits
To resolve this difficulty, we focus on an even simpler problem. That of finding lower bounds (depth lower bounds) for monotone circuits which compute monotone functions.

What are monotone functions? We can define an ordering on strings by lexicographic ordering ($x_{1}\cdots x_{n} \leq y_{1}\cdots y_{n}$ iff for every $1\leq i\leq n$, $x_i \leq y_i$)
> a function is called *monotone* if $x\leq y$, then $f(x) \leq f(y)$ (for example: $0 \leq 1$).

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

In the setting of communication complexity, two players (Alice and Bob) want to solve some task together. Alice is given the clue $x$ and Bob is given $y$ and they need to compute some function of $x$ and $y$. We assume that both players have unlimited computational power and are interested in the amount of information (*bits*) communicated between them.

### Karchmer-Widgerson Games
We are interested in a specific class of games, these are called Karchmer-Widgerson (KW) games. The game is defined as follows for some *monotone* function $f$:
> Karchmer-Widgerson Game $M_f$:
> * Alice gets $x \in \lbrace 0, 1 \rbrace^{n}$ such that $f(x) = 1$.
> * Bob gets $y \in \lbrace 0, 1 \rbrace^{n}$ such that $f(y) = 0$. 
> * **Goal:** Find $i$ such that $x_i\neq y_i$.

#### Comment: Such an index $i$ always exists because $f$ is monotone.
## Connecting Communication Complexity and Monotone Circuit Depth
Given a *monotone* function $f$ we denote by $\mathrm{Depth}(f)$ the monotone circuit depth of the function and by $\mathrm{CC}(M_{f})$ the communication complexity of the KW game for $f.$ The following theorem gives a profound connection between *circuits* and *communication complexity*. In fact
$$\mathrm{Depth}(f) = \mathrm{CC}(M_{f})$$
In other words, to compute a lower bound for the run-time of an algorithms (in the monotone circuit model), we could try to show a lower bound for the number of bits communicated between two parties in the game $M_{f}$! This gives us a way to analyse circuits using communication complexity (🤯).
___
We will prove the equality by showing that ${CC}(M_f) \leq \mathrm{Depth}(f)$ and $\mathrm{Depth}(f) \leq \mathrm{CC}(M_{f})$.
### First inequality (${CC}(M_f) \leq \mathrm{Depth}(f)$)
Try to prove this inequality yourself before proceeding to read the proof.
{{< details "Hint" >}}
Try proving this by induction.
{{< /details >}}
{{< details "Proof" >}}
Suppose we are given a circuit $C$ of depth $\mathrm{Depth}(f)$. We will design a protocol for Alice and Bob for the game $M_f$ which uses at most $\mathrm{Depth}(f)$ bits of information. We will prove this claim by induction. 
Alice and Bob are both going to hold the exact same circuit $C$, and are going to follow the following protocol:

**Induction Base:** If the circuit is of depth 1, than the circuit is $x_{i}$ for some $i$, so they need to communicate $0$ bits.

**Induction Step:** suppose the gate at the output of the circuit is an OR gate, and denote the left left sub-circuit $f_0$ and the right sub-circuit $f_1$, and so $$f = f_0 \vee f_1.$$ Alice and Bob know that $f(x) = 1$ and $f(y) = 0$, thus $$f_0(y) = f_1(y) = 0$$ and $$f_0(x) = 1 \vee f_1(x) = 1.$$ The condition $f_0(y) = f_1(y) = 0$ about Bob's clue gives no new information to Alice, because she already knows that this is true. But Alice could communicate a bit $j$ such $f_j(x) = 1$. $f_j$ is monotone as it is a subcircuit of a monotone circuit and has depth $\mathrm{Depth}(f_j)\leq \mathrm{Depth}(f) - 1$. Also, note that $f_j(x)=1$ while $f_j(y)=0$ so the initial condition for the game still holds. 
![Protocol from circuit](https://i.imgur.com/lYGbDt1.jpeg "Protocol for Alice and Bob in the case that the top-most gate is an OR gate")

Hence, by the induction hypothesis, Alice and Bob could succeed in the game $f_j$ with $\mathrm{Depth}(f_j)$ bits. In other words $$ \mathrm{CC}(M_f) \leq 1 + \mathrm{CC}(M_{f_j}) \leq 1 + \mathrm{Depth}(f) - 1 = \mathrm{Depth}(f)$$

**Exercise:** We are missing the case for AND in the induction, modify the argument for the OR case.
{{< /details >}}
___
### Second inequality ($\mathrm{Depth}(f) \leq \mathrm{CC}(M_f)$)
This inequality is considerably harder to prove. In this case suppose Alice and Bob have a protocol for the game $M_f$, we need to find a circuit $C$ of depth at most $\mathrm{Depth}(f)$ which computes $f$.

Let's assume for a moment that the protocol starts with Alice sending a bit to Bob $j$. Bob now knows that Alice's input $x$ is in some set $X_j$. Essentially, this bit partitions Alice's input set $A:=f^{-1}(1)$ (all $x$`s such that $f(x)=1$) to two disjoint sets $A = A_0 \uplus A_1$ (i.e. the set of inputs for which Alice sends 0 and the set of inputs for which Alice sends 1).

The key insight is that we could consider a **more general** game then before, and conclude that the inequality holds as it is a special case.

With this newly found intuition we might want to define a more general game. Given a monotone function $f$, we define the following game

### The General Karchmer-Wigderson Game 
$M_{A,B}$ (we drop $f$ in an abuse of notation):
> * Alice gets $x \in A$ such that $f(x) = 1.$
> * Bob gets $y \in B$ such that $f(y) = 0.$
> * **Goal:** Find $i$ such that $x_i\neq y_i.$

Back our previous goal, we want to show that $\mathrm{Depth}(f) \leq \mathrm{CC}(M_f)$, equivalently $\mathrm{Depth}(f) \leq \mathrm{CC}(M_{A,B})$ for $A=f^{-1}(1)$ and $B=f^{-1}(0)$. Furthermore, assume as before that protocol start by Alice sending the bit $j$ to Bob.

We would want to leverage some induction hypothesis somehow. The induction should be about the communication complexity of the sub-protocol $\mathrm{CC}(M_{A_j,B})=\mathrm{CC}(M_{A,B})-1$.

But now it seems we are stuck. Since $f$ is fixed, it couldn't possibly be that $\mathrm{Depth}(f)\leq \mathrm{CC}(M_{A_j,B})$.

How could we solve this conundrum?
{{< details "Solution" >}}
We observe that $f$ need not be fixed, in fact we only care about $g_j$ that is equal to $f$ on the set $A_j\cup B$.
{{< /details >}}

___
Thus, we come up with the following theorem:

**Theorem:**

If $\mathrm{CC}(M_{A,B})=d$ for some function monotone function $f$ then there exists a monotone function $g$ such that:
1. $\mathrm{Depth}(g) \leq d$.
2. $g(x) = 1$ for $x\in A$.
3. $g(y) = 0$ for $y\in B$.

In fact this theorem, gives us an algorithm for constructing a circuit for $g \equiv f|_{A\cup B}$. Of course, the inequality we set out to prove follows from an application of this theorem with $A=f^{-1}(1)$ and $B=f^{-1}(0)$.

The proof of this theorem draws from the previous proof. Try to find a way of construction a circuit for $g$ using a proof by induction.

{{< details "Proof" >}}
> **Induction Base:** If $d=0$, then the players don't need to communicate any information. Therefore, the players know that there exists some coordinate $i$ such that $x_i\neq y_i$ thus the circuit is simply the circuit which computes the function $f(z)=z_i$
>
> **Induction Step:** In this case, we assume Alice sends the first bit to Bob. This partitions Alice's input set $A$ to $A=A_0 \uplus A_1$. By the induction hypothesis, there exists $f_0$ such that:
>1. $\mathrm{Depth}(f_0) \leq d - 1$.
>2. $f_0(x) = 1$ for $x\in A_0$.
>3. $f_0(y) = 0$ for $y\in B$. 
>
>and also, there exists $g_1$ such that:
>1. $\mathrm{Depth}(f_1) \leq d - 1$.
>2. $f_1(x) = 1$ for $x\in A_1$.
>3. $f_1(y) = 0$ for $y\in B$.
>
>We know want to construct $g$ such that $g\equiv f|_{A\cup B}$. It is important to note that it is possible that $f_0(x)=0$ for $x \in A_1$ (and correspondingly it could be that it is possible that $f_1(x)=0$ for $x \in A_0$ ). Consider the case that $g = f_0 \wedge f_1$, and $f_0(x)=1$ and $f_0(x)=0$ for some $x\in A_0$, in this case $$g(x)=0\wedge 1 = 0\neq 1.$$ However, if $g = f_0 \vee f_1$, then indeed $g(x)=f_0(x) \vee f_1(x) = 1$ for $x\in A\cup B$. By the induction hypothesis $$\mathrm{Depth}(g)=1+\max(\mathrm{Depth}(f_0) , \mathrm{Depth}(f_1)) \leq 1 + d - 1 = d.$$ 
>
> **Exercise**: Show that $g=f_0 \wedge f_1$ if Bob sends the first bit. 

{{< /details >}}

### Some remarks
1. Counter-intuitively we proved the second inequality by proving a more general case. When I initially saw this proof, it confused me. But I don't see another way to make the induction work.
> Could you think of other examples where to prove a statement, we look for a more general statement?
This technique is called "strengthening the induction hypothesis" [for more examples see](https://mathoverflow.net/questions/31699/strengthening-the-induction-hypothesis).
2. Some results that were proved using this technique:
-  the function that takes as input a a bipartite graph and checks whether is contains a bipartite matching requires monotone depth $\Omega(n)$.
- the function of st-Connectivity: given a graph $G$ and two input nodes $s$ and $t$ whether $s$ and $t$  the function determines whether $s$ and $t$ are connected. This function requires monotone depth $\Omega(\log(n)^2)$.
4. Both results are tight.
