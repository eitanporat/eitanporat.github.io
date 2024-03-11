---
author: "Eitan Porat"
title: "Learning is Compression"
date: "2024-03-10"
description: In this blog post, we explore how compressing data is equivalent to learning data distributions. Not in the sense that neural networks are compressing data in their weights, but in an information theoretic sense. Following up on Shannon's work, we use a GPT-2 model from Karpathy's nanoGPT repo to create a compression algorithm which combines Shannon encoding with next-token prediction. Using this model, we get a compression algorithm which beats the native python implementation (18.9% vs 44.73%)
tags: 
ShowToc: true
ShowBreadCrumbs: false
math: true
collapse: true
---
# A Mathematical Theory of Communication
In 1948, Claude E. Shannon, while working in Bell Labs published his paper ["A Mathematical Theory of Communication"](https://math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf). Shannon was interested in modeling the English language. In his paper, he assumed that the English language has a 27-symbol alphabet of 26 letters and a space. He tried to model it using stochastic processes.

The simplest stochastic process to model English is a process where each symbol is sampled equiprobably and independently. To give a visual idea of how this process "looks" he gave as an example for a typical sequence of characters. 
Let's replicate his experiment using Python. First, we will load a corpus using the `nltk` package ([Emma by Jane Austen](https://en.wikipedia.org/wiki/Emma_(novel)))

```python import nltk
from nltk.corpus import gutenberg

nltk.download('gutenberg')
austen_emma = gutenberg.raw('austen-emma.txt')
```

Here are the first 200 characters of the document:
>[Emma by Jane Austen 1816]
>
>VOLUME I
>
>CHAPTER I
>
>
>Emma Woodhouse, handsome, clever, and rich, with a comfortable home
>and happy disposition, seemed to unite some of the best blessings
>of existence; an

Now we can extract all letters in our "alphabet" and compute their respective frequencies

```python import string
from collections import Counter

austen_emma = austen_emma.upper()
austen_emma = ''.join(c for c in austen_emma if c in string.ascii_uppercase + ' ')
counts_table = Counter(austen_emma)
counts_table
```

{{< details "the frequency table" >}}
```python 
Counter({'E': 86021,
         'M': 20705,
         'A': 54379,
         ' ': 147633,
         'B': 11131,
         'Y': 15706,
         'J': 1121,
         'N': 47288,
         'U': 20646,
         'S': 42508,
         'T': 59201,
         'V': 7747,
         'O': 53199,
         'L': 27674,
         'I': 46606,
         'C': 15462,
         'H': 42568,
         'P': 10541,
         'R': 40914,
         'W': 16290,
         'D': 28582,
         'F': 15140,
         'G': 13672,
         'X': 1378,
         'Q': 910,
         'K': 4763,
         'Z': 175})
```
{{< /details >}}

Funnily enough, the first three letters in the table are "E", "M", "A" which are the first letters in the name of the novel. Now let's sample characters according to the frequencies in the document.
```python import random
characters, counts = zip(*counts_table.items())
sum_counts = sum(counts)
probabilities = [count / sum_counts for count in counts]
print(''.join(random.choices(characters, weights=probabilities, k=100)))
```
This is the string we sample
> FDHTEDEII EIOIIAI U FPECOONWMLOGYTRALEOM MF ONEMTN FSOLD EFANA  EW NLOXEDASNHC ERDGRRHLPRTOATEA GSIU

This output doesn’t resemble English. Let's modify our code to be able to sample n-grams (n consecutive characters) independently.
```python 
ngrams = [''.join(ngram) for ngram in zip(*(austen_emma[i:-(n-i)] for i in range(n)))]
counts_table = Counter(ngrams)
```
Running the code with n = 2, we sample
> E OLASANEROFANNEECLDPAIN TADWOA ASD USWHEREMR OTIPTHSCN AL A ABOY TEITINNGBE WINHEIO E SERNTERTHDERSMALEHAVEERHE TPPSHYOINALHEEC T TL PL OONIECE IFEHI CY ECIEE ERD HIR MRHELLWOM CTORBRBENT HHAS T IML 

with n = 3
> ESSGHAOF I AKHIVEDIEVANE TOMAN ABTHAUSTDONBEF AT THR ORE UT ONEYOUCIVHOUSHESHE HAEEA RA EMILL ALN SE IWHO BEANDISTIKE OBSTAT ILYIYOUA GRY  THYOUR ITHEOFTRSTS QARRNDRS AONDEAK TOWHIREVNTSO H UN HASELAVETO EADRSEY HESSIS  MI MREXPE B PESHOAKEGE PPOD V OFES RIAS WT I  ILLYND W A HEPENHIME FH WDYSRAIIRF

with n = 4 
>  HADG AUER ORAY H ITS ASE HE HURNED ION  TO  SEE THRMEON TO  MOR MR CE FIAM D MRTIONHE S LASTAY EM TEM ACHIL HERETITE CAELTO FATMER E TOME IHAT ACTLYOR D THNOTH HISHE DATE REAT NOTPPENDARET BEE THEAR H A YWITSHE  WESREOVNDUCELPLI COSO M AFT HERIED GH TUGURE HE DOSCHURES AIBLE EVIE PRST BELF HEREHIMYELL  HERHOUSAMAN FUTT ITE FA TOW QUILIKEY TOYOU RONGHERS ANDAS INE O COM PERIN  USIO NOTE  S ANYRLDA

It doesn't look like English because we are sampling the n-grams completely independently. Instead, we can model language as a Markov process, where the character (or n-gram) $X_{i}$ is sampled using the law $P_{\mathrm{empirical}}(X_{i}|X_{i-1},\dots,X_{i-n+1})$. Given the  distribution of ngrams we can create the marginal distribution of a character given the previous n-1 characters. If the marginal distribution doesn't exist, because it didn't appear in the original distribution we will sample the letters according to the English language frequencies.

```python 
def marginal(prefix, counts_table):
  marginal_freqs = {ngram[-1]: count for ngram, count in freqs.items() if ngram[:-1] == prefix}
  if not marginal_freqs:
    marginal_freqs = english_freqs

  characters, counts = zip(*marginal_counts_table.items())
  sum_counts = sum(counts)
  probabilities = [count / sum_counts for count in counts]
  return characters, probabilities
``` 
Now we can try to sample strings using this marginal distribution (starting from the word 'EMMA')
```python
n = 5 
s = 'EMMA'

for i in range(100):
  characters, probabilities = marginal(s[-(n-1):], counts_table)
  s += random.choices(characters, weights=probabilities, k=1)[0]

s
```
This code outputs
> EMMA TURNED POOR HIM AND CONSITY WELL WITH ALIKELY SO MUCH CONTINGLYBUT SO LONGERMUST AND MR ELTON AGAIN

although the output is nonsensical it looks much better. We are starting to see familiar words and grammatical structures (the words AND SO MUCH, etc.). 

## Pros and Cons to our Method
There are some major disadvantages to our method:
* The method scales exponentially with the length of the n-grams
* The longer the n-grams become, the less likely they will be recorded in our frequencies table. We can actually see quality deteriorate as we make the table bigger.
* The method assumes that the distribution is stationary, we sampled characters using the same law

We could improve our method in several ways:
* Training our frequency tables on a larger corpus - this will give us more frequencies and less failure cases.
* Instead of sampling characters - we can sample words.
* Use a different method.

## Shannon's Source Coding Theorem
Under the strict assumption that in a sufficiently large string every n-gram appears according to its expected frequency with probability 1 and the assumption of stationarity, Shannon proved that his famous "Source Coding Theorem". 

He proved that the number of bits required to store (without loss of information) an m-letter string is roughly $m(H+\varepsilon)$. What does it mean to store information, he envisioned a compression scheme $E$ that takes as input m-bit strings and outputs $m(H+\varepsilon)$ bit strings and a decoder $D$. Mathematically, a function $E: \lbrace 0,1\rbrace^{m}\mapsto \lbrace 0,1 \rbrace^{m(H+\varepsilon)}$ and a function $D: \lbrace 0,1\rbrace^{m(H+\varepsilon)}\mapsto \lbrace 0,1 \rbrace^{m}$ such that $D(E(x))=x$ for "typical strings". What do we mean by typical string, the distribution of strings coming from our source. It is unlikely we can compress any arbitrary string.

In the case where the code is a symbol code and all symbols are sample uniformly, I will provide a brief overview of the proof. By the Law of Large Numbers (see the previous blog post for a proof using the Ergodic Theorem)
$$\Pr\left(|\lim_{n\to \infty}\frac{1}{n}\log \Pr(X_{1},\dots,X_{n}) - \mathbb{E}[\log \Pr(X_{1})]|>\varepsilon\right)\to 1$$ and $\mathbb{E}[\log \Pr(X_{1})]=H$ is called the entropy of the distribution.

Therefore, typical sequences satisfy the condition $\frac{1}{n}\log \Pr(X_{1},\dots,X_{n}) \in H \pm \varepsilon$ with probability 1. So $\Pr(X_{1},\dots,X_{n}) \in 2^{-n(H\pm \varepsilon)}$ but since probabilities must sum to 1 there are at most $2^{n(H+\epsilon)}$ "typical" sequences. Our encoder works in the most naïve way possible, it assigns each sequence a number from $0$ to $2^{n(H+\epsilon)}$, so it uses at most $n(H+\epsilon)$ bits. 

Although incredibly easy to prove this theorem was profound and lay the foundations for text compression. Most compression schemes assume that the source is ergodic and given this assumption can compress optimally. 

# Compressing even further
Going back to the way we modeled the English language, we noticed some obvious cons with the "Shannon" way of modeling language, the non-stationary asssumption. What if every character is dependent on the characters that appeared previously?

We will create a compression algorithm which is almost optimal under the assumption that our compression is done sequentially, i.e. compresses from left to right. Given an compression encoder $E:\Sigma^{\*}\to \lbrace 0,1 \rbrace^{\*}$ (from our alphabet $\Sigma$ to binary strings) and a conditional encoder $E(X_{i}\mid X_{1}\dots X_{i-1})$, the sequential assumption can be written as follows:
$$E(X_1\dots X_T) = \oplus_{i=1}^{T}E(X_{i}\mid X_{1}\dots X_{i-1}),$$ where $\oplus$ is concatentation over strings. Furthermore, we have $$|E(X_1\dots X_T)| = \sum_{i=1}^{T}|E(X_{i}\mid X_{1}\dots X_{i-1})|$$ the conditional encoder can be implemented optimally if the distribution $\Pr(X_{i}\mid X_{1}\dots X_{i-1})$ can be computed. For now, let's assume that we have a black box which can give us the marginal distribution $p$, approximately. Shannon suggested an almost optimal encoder so we will use it instead. Quoting Shannon from his original paper: 
> Arrange the messages of length N in order of decreasing probability and suppose their probabilities are $p_1\leq p_2\leq p_3\leq \dots p_n$. Let $P_s = \sum_{1}^{s-1}{p_i}$; that is $P_s$ is the cumulative probability up to, but not including, $p_s$. We first encode into a binary system. The binary code for message $s$ is obtained by expanding $P_s$ as a binary number. The expansion is carried out to $m_s$ places, where $m_s$ is the integer satisfying $$\log\left(\frac{1}{p_s}\right)\leq m_{s} < 1 + \log\left(\frac{1}{p_s}\right)$$ Thus the messages of high probability are represented by short codes and those of low probability by long codes. From these inequalities we have $$\frac{1}{2^{m_s}} \leq p_{s} < \frac{1}{2^{m_s-1}}$$ The code for $P_s$ will differ from all succeeding ones in one or more of its $m_s$ places, since all the remaining $P_i$ are at least $2^{-m_{s}}$ larger and their binary expansions therefore differ in the first $m_s$ places. Consequently all the codes are different and it is possible to recover the message from its code.

Shannon gives an encoding scheme which assigns each character at most $\log(\frac{1}{p_s}) + 1$ bits, so in expectation achieves $$\leq \mathbb{E}\_{p_{s}}[\log(\frac{1}{p_{s}})+1]=H(p) + 1$$ bits per message. It is not obvious that a decoder can decode these strings. By induction on the "messages" (characters in our case) he proves that this code is prefix free, in the sense that no encoding is a prefix of a previous encoding. A naïve decoder could decode the character by attempting to find the longest encoding of $P_{s}$ which is a prefix of the string. This could be done by creating a prefix tree. Alternatively, one could use [Huffman Coding](https://en.wikipedia.org/wiki/Huffman_coding) to encode the string by directly constructing a prefix tree in an optimal way. We will stay true to the source and use Shannon's encoding (also known as [Shannon-Fano Coding](https://en.wikipedia.org/wiki/Shannon%E2%80%93Fano_coding)). 

```python
import math

def float_to_binary(number, length):
  output = ""
  for i in range(1, length + 1):
    digit = int(number >= 0.5)
    output += str(digit)
    number = 2 * (number - 0.5 * digit)

  return output

def shannon_encoding(freq_table):
  items = sorted(freq_table.items(), key=lambda x: x[1], reverse=True)
  encoding = {}
  Pi = 0

  for char, prob in items:
    encoding[char] = float_to_binary(Pi, math.ceil(math.log2(1/prob)))
    Pi += prob
  
  return encoding

def encode(string, encoding):
  return ''.join(encoding[char] for char in string)
``` 
To decode Shannon's encoding we can construct a binary prefix tree.
```python
class Node:
  def __init__(self, value=None):
    self.value = value
    self.left = self.right = None

def prefix_tree_from_encoding(encoding):
  items = sorted(encoding.items(), key=lambda x: len(x[1]))
  root = Node()

  for key, value in items:
    node = root
    for char in value:
      if char == '0':
        if not node.left: node.left = Node()
        node = node.left
      if char == '1':
        if not node.right: node.right = Node()
        node = node.right
    node.value = key
  
  return root

def decode(string, encoding):
  output = ""
  prefix_tree = prefix_tree_from_encoding(encoding)
  node = prefix_tree
  for char in string:
    if char == '0':
      node = node.left
    if char == '1':
      node = node.right
    if node.value:
      output += node.value
      node = prefix_tree
  return output
```

## The connection between learning and compression
Assume that there exists a real probability distribution over the English language strings, let's denote it by $\mathbb{P}^{real}$, and let $\mathbb{P}^{pred}$ the probability distribution obtained from our black box. let $T$ be the length of the strings of this distribution then
$$\mathbb{E}\_{X_{1}\dots X_{T}\sim\mathbb{P}^{real}}\left[\left|E\left(X_{1}\dots X_{t}\right)\right|\right] = \sum_{i=1}^{T}\mathbb{E}\_{X_{1}\dots X_{i}\sim\mathbb{P}^{real}}\left[\left|E\left(X_{i}\mid X_{1}\dots X_{i-1}\right)\right|\right]$$ by the sequential encoding assumption. By Shannon's encoding $$\sum_{i=1}^{T}\mathbb{E}\_{X_{1}\dots X_{i}\sim\mathbb{P}^{real}}\left[\left|E\left(X_{i}\mid X_{1}\dots X_{i-1}\right)\right|\right]\leq -\sum_{i=1}^{T}\mathbb{E}\_{X_{1}\dots X_{i}\sim\mathbb{P}^{real}}\left[\log_{2}\mathbb{P}^{pred}\left(X_{i}\mid X_{1}\dots X_{i-1}\right)\right]+1$$ rearranging we get $$-\sum_{i=1}^{T}\mathbb{E}\_{X_{1}\dots X_{i-1}\sim\mathbb{P}^{real}}\left[\mathbb{E}\_{X_{i}\mid X_{1}\dots X_{i-1}\sim\mathbb{P}^{real}}\left[\log_{2}\mathbb{P}^{pred}\left(X_{i}\mid X_{1}\dots X_{i-1}\right)\right]\right]+1$$ which is the cross entropy loss-function between $\mathbb{P}^{real}\left(X_{i}\mid X_{1}\dots X_{i-1}\right)$ and $\mathbb{P}^{pred}\left(X_{i}\mid X_{1}\dots X_{i-1}\right)$, the cross entropy between black box's prediction of the marginal and the real marginal distribution. The cross entropy is minimized when $\mathbb{P}^{pred}=\mathbb{P}^{real}$ in which case we get the sum of the entropy of the marginals. In conclusion, **next-character (or next-token) prediction is equivalent to sequential compression**.

To hammer the point home, let's use a [Transformer model](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)) as our black box and combine it with Shannon's encoding to get a pretty good compression model. I used [Karpathy's nanoGPT](https://github.com/karpathy/nanoGPT) GPT-2 as a next-token predictor. Instead of working on the character level it operates on the token level using [byte-pair encoding](https://en.wikipedia.org/wiki/Byte_pair_encoding).

To encode a string of text we first tokenize it and then encode each token according to the marginal distribution we obtain by running the model on all of the previous token. We encode this marginal distribution using Shannon encoding. That is we apply Shannon's encoding to each new token, we get a different encoding table for every token.

```python
def compress(text):
  tokens = tokenize('\n' + text)
  tokens = torch.tensor(tokens, dtype=torch.long)
  output = ''

  for i in range(1, len(tokens)):
    # get marginal from model
    cond_tokens = tokens[None,:i] if i <= max_context else tokens[None,i-max_context:i] 
    probs = gpt2(cond_tokens)[0].flatten().softmax(0)
    prob_next = probs[tokens[i]] # probability of next token
    # sort probabilties
    probs, indices = torch.sort(probs, descending=True)
    idx = torch.argwhere(indices == tokens[i]).item()
    # Pi is the cumulative sum up until idx (not including idx)
    zero_tensor = torch.tensor([0])
    probs = torch.cat((zero_tensor, probs), dim=0)
    Pi = probs.cumsum(0)[idx].item()
    # encode as a binary string using Shannon's method
    encoded_token = float_to_binary_numba(Pi, math.ceil(math.log2(1/prob_next)))
    output += encoded_token
  
  return output

```
Because we construct a different Shannon encoding for every token, I replaced the tree decoding with a faster method using hashtables.
```python
def decode(text, encoding):
  output = ""
  while text:
    token, i = decode_token(text, encoding)
    output += token
    text = text[i:]
  return output

def decode_token(text, encoding):
  inverted_encoding = {value: key for key, value in encoding.items()}
  for i in range(len(text)):
    if text[:i+1] in inverted_encoding:
      return inverted_encoding[text[:i+1]], i+1
```

Finally, to decompress the text we apply the GPT model on the tokens we have already decoded. Using this marginal distribution we can reconstruct the encoding for each token, and then we apply the decoding algorithm per token.

```python
def decompress(text):
  tokens = tokenize('\n')
  tokens = torch.tensor(tokens, dtype=torch.long)
  output = []
  processed = 0
  text_length = len(text)

  while text:
    # feed in tokens and truncate if number of tokens exceeds max_context
    cond_tokens = tokens[None,:] if len(tokens) <= max_context else tokens[None,-max_context:] 
    probs = gpt2(cond_tokens)[0].flatten().softmax(0)
    # construct frequency table
    freq_table = {i:prob.item() for i, prob in enumerate(probs)}
    encoding = shannon_encoding(freq_table)
    token, i = decode_token(text, encoding)
    # decompress the rest of the text
    text = text[i:]
    output.append(token)
    # append the decoded token
    tokens = torch.cat((tokens, torch.tensor([token], dtype=torch.long)), dim=0)
    processed += i
    print(f'\r Decompressed {processed/text_length*100:.2f}% of text...', end='')

  return detokenize(output)
```

## Results
Let's see how it performs! I ran the code with `max_context = 128` on the first 10,000 characters of Emma by Jane Austen (80,000 bits). The compression algorithm and decompression algorithm ran in (5 min 49s) and (21min 44s) respectively. The size of the compressed text using our compression algorithm is **15,179 bits (18.9% compression rate)**, compared to the **35,784 bits (44.73% compression rate)** using the Python native `zlib` library.

# Closing Remarks
1. I think it's interesting to try more performant neural networks (such as GPT-2 XL or LLAMA) to try to push this even further. As we saw better prediction equals better compression.
2. The implementation can be further improved by using [arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding) instead. There is an overhead for each token, because we are encoding even token separately instead of encoding the text using one floating point number between [0, 1].
3. The [Hutter Prize](https://en.wikipedia.org/wiki/Hutter_Prize) was an inspiration for this blog post.
4. Check out the [notebook for my code](https://nbviewer.org/github/eitanporat/eitanporat.github.io/blob/main/content/posts/compression.ipynb)