---
# config: https://sli.dev/custom/
# https://sli.dev/guide/theme-addon.html#use-theme
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static/gSnIwHBKw3c.webp
# some information about your slides (markdown enabled)
title: Analysis of algorithms
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade-out
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Analysis of algorithms

Navigation

|                                                     |                             |
| --------------------------------------------------- | --------------------------- |
| <kbd>right</kbd> / <kbd>space</kbd>                 | next animation or slide     |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd>                                       | previous slide              |
| <kbd>down</kbd>                                     | next slide                  |

<div class="abs-br m-6 text-xl">
  <a href="https://github.com/dzianis-dashkevich/discussion-club" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

---

# Table of contents

You can use the `Toc` component to generate a table of contents for your slides:

<Toc minDepth="1" maxDepth="1" />

---

# Why Analyze an Algorithm?

<style>
p {
    font-size: 1rem;
}
</style>

<p v-click class="opacity-50">

- Evaluate Efficiency
  - Time Complexity: Determine how the execution time of the algorithm scales with the size of the input.
  - Space Complexity: Determine how the memory usage of the algorithm scales with the size of the input.
- Compare Algorithms
  - Helps in comparing different algorithms for the same problem to choose the most suitable one based on performance criteria.
  - Allows trade-offs between time and space (e.g., faster algorithms may use more memory).
- Optimize Solutions
  - Identifying bottlenecks or inefficiencies in an algorithm helps improve its design, making it faster or reducing its memory usage.
  - Adjust implementation based on worst-case, average-case, and best-case scenarios for better performance.
- Theoretical Validation
  - Formal analysis validates the algorithm's correctness, ensuring it produces the desired output for all valid inputs.

</p>

---
layout: image-right
image: img/scientific-method.png
backgroundSize: contain
---

# Scientific Method

- Observer running time of the program on a give computer.
- Develop hypothesis that's consistent with the observations.
- Predict a running time for larger input size.
- Verify the predictions by making more observations.
- Validate until we're comfortable that our model hypothesis and observations all agree. (loop)

---

### Let's consider the following algorithm

```ts {all|2|3|4|6|7|8|9|10|16|all}{lines:true} twoslash
// How many triples sum to zero? Brute-force solution.
function threeSum(arr: Array<number>): number {
    const n = arr.length;
    let count = 0;

    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    count++;
                }
            }
        }
    }

    return count;
}
```

---

### Measure Time (Observe)

```ts {all|1-6|8-12|14-16|18-23|all}{lines:true}
function measureTime(arr: Array<number>): void {
    const start = performance.now();
    threeSum(arr);
    const end = performance.now();
    console.log(`Execution time for ${arr.length}: ${end - start} ms`);
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function generateSample(size: number): Array<number> {
    return Array.from({ length: size }, () => getRandomInt(-100, 100));
}

measureTime(generateSample(128));
measureTime(generateSample(256));
measureTime(generateSample(512));
measureTime(generateSample(1024));
measureTime(generateSample(2048));
measureTime(generateSample(4096));

```

---
layout: image-right
image: img/plot.png
backgroundSize: contain
---

### Plot observed data

```shell
Execution time for 128: 1.4862080000000013 ms
Execution time for 256: 2.153834 ms
Execution time for 512: 15.630875 ms
Execution time for 1024: 109.55587499999999 ms
Execution time for 2048: 848.7782080000001 ms
Execution time for 4096: 5712.405833 ms
```

---
layout: image-right
image: img/log-log-plot.png
backgroundSize: contain
---

### log-log plot

<style>
p {
    font-size: 0.6rem;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
}
</style>

Line formula:

$\text{Y} = mX + c$

where `m` is slope and `c` is y-intercept.

Calculate the slope (from the plot):

$\text{slope} = \frac{\Delta \log(x)}{\Delta \log(y)} = \frac{12.3 - 4}{12-9} = \frac{8.3}{3} \approx 3$

Calculate the y-intercept (from the plot):

$\text{y-intercept} = Y - mX = 4 - 3 * 9 = 4 - 27 = -23$

Apply log-log transformation to the algorithm:

$log_2{T(N)} = 3 \cdot log_2{N} + (-23)$

Rewrite in exponent form and transform to the power law form:

$T(N) = 2^{3 \cdot log_2{N} + (-23)} = 2^{(-23)} \cdot 2^{3 \cdot log_2{N}} = 2^{-23} \cdot N^{3}$

So, our hypothesis is that our running time is about $2^{-23} \cdot N^{3} \approx 1 \cdot 10^-7 \cdot N^3$

---

### Prediction and verification

Based on our hypothesis, we can predict that the running time for $N = 8192$ will be ~ 54976 ms.

```shell
Execution time for 8192: 55273.832416 ms
```

---

### Power Law Dependencies

Power Law:

$T(N) = a \cdot N^b$

System independent effects (determines exponent `b`)
- Algorithm itself
- Input data

System dependent effects (determines constant `a`)
- Hardware: CPU, memory, cache, etc...
- Software: compiler, interpreter, etc...
- System: OS, other running programs, etc...


---

# Mathematical Models

We can use the scientific method to predict the running time of an algorithm,
but it does not help us understand what is happening in algorithms.
Since we can use the scientific method without knowing the algorithm's implementation.

```ts
const input = generateInput(N);
// we don't need to know algortihm's details to use scientific method
measure(() => algorithm(input));
```

We can use mathematical models to understand the behavior of algorithms.

$\text{Running time} = \text{sum of costs} \cdot \text{frequency for all operations}$

Operation costs depend on hardware and software

Frequency depends on the algorithm and input data

---

## Model of Computation

You can determine the cost of basic operations on a given computer, but we want to abstract away from a specific hardware/software, so we will use abstract models of computation.

There are many [abstract models of computation](https://en.wikipedia.org/wiki/Model_of_computation), but the most common one is the [Random Access Machine (RAM) model](https://en.wikipedia.org/wiki/Random-access_machine).

We will consider the cost of basic operations (eg: read/write to memory, arithmetic operations, etc...) as some constant time. (And you can determine these costs based on your hardware/software)

---

### Lets` consider the following algorithm

````md magic-move
```ts
function oneSum(nums: Array<number>): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count++;
        }
    }
    return count;
}
```

```ts
function oneSum(nums: Array<number>): number {
    // declare a variable count and initialize it to 0 (2 operations)
    let count = 0;
    // declare a variable i and initialize it to 0 (2 operations)
    // read nums.length (N + 1 operation)
    // compare i to nums.length (N + 1 operations)
    // increment i (N operations)
    for (let i = 0; i < nums.length; i++) {
        // array access (N operations)
        // compare nums[i] to 0 (N operations)
        if (nums[i] === 0) {
            // increment count (0 to N operations)
            count++;
        }
    }
    return count;
    // 2 + 2 + N + 1 + N + 1 + N + N + N + N = 4N + 6 operations
}
```
````

---

### More complicated example

````md magic-move
```ts
function twoSum(nums: Array<number>): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === 0) {
                count++;
            }
        }
    }
    return count;
}
```

```ts
function twoSum(nums: Array<number>): number {
    // Declare a variable 'count' and initialize it to 0 (2 operations: 1 for declaring, 1 for initializing).
    let count = 0;

    // Declare a variable 'i' and initialize it to 0 (2 operations: 1 for declaring, 1 for initializing).
    // Check 'i < nums.length' (N + 1 operations: N comparisons and 1 final comparison when the loop ends).
    // Increment 'i' (N operations: once for each loop iteration).
    for (let i = 0; i < nums.length; i++) {
        // Declare a variable 'j' and initialize it to i + 1 (N operations: 1 for each outer loop iteration).
        // Check 'j < nums.length' (N(N + 1)/2 comparisons: the inner loop runs fewer times as 'i' increases).
        // Increment 'j' (N(N + 1)/2 operations, one for each iteration of the inner loop).
        for (let j = i + 1; j < nums.length; j++) {
            // Access 'nums[i]' and 'nums[j]' to check their values (2 operations per iteration).
            // Perform addition 'nums[i] + nums[j]' (1 operation per iteration).
            // Compare the sum to 0 (1 operation per iteration).
            if (nums[i] + nums[j] === 0) {
                // Increment 'count' (0 to N(N + 1)/2 operations, one for each time the condition is true).
                count++;
            }
        }
    }
    return count;
    // Putting it together: 2N + 3 + N + N(N + 1)/2 + N(N + 1)/2 + 4N(N + 1)/2 = 4N^2 + 5N + 3.
}
```
````

---

# Tilde Notation

<style>
p, li {
    font-size: 0.5rem;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
}
</style>

We can estimate the running time (or memory) as a function of input size N.

We can ignore lower terms:

- when N is large - lower terms are insignificant
- when N is small - we don't really care, since they are small

so we can say that:

$T(N) = 4N + 6 \sim 4N$

$T(N) = 4N^2 + 5N + 3 \sim 4N^2$

Formal definition:

$F(N) \sim G(N)$ 

means

$\displaystyle{\lim_{x \to \infty}} \frac{F(N)}{G(N)} = 1$

Solve for one of our examples:

$\displaystyle{\lim_{x \to \infty}} \frac{4n^2 + 5n + 5}{4n^2} = \frac{4n^2}{4n^2} + \frac{5n}{4n^2} + \frac{5}{4n^2} = 1 + 0 + 0 = 1$

---
layout: image-right
image: img/order-of-growth-classification.png
backgroundSize: contain
---

# Order of Growth

Fortunately when we analyze algorithms, not too many different functions arise and that property allows us to classify algorithms according to their performance as the problem size grows:

1, log N, N, N log N, N^2, N^3, 2^N

When we say the running time of the algorithm is proportional (for example) to N log N - That means that our hypothesis is that the running time is ~ C * N log N, where C is some constant. But we don't really care about this constant when talking about the order of growth. 


---
layout: image-right
image: img/common-order-of-growth-classifications.png
backgroundSize: contain
---

### Common Order of Growth Classifications


---

# Best, Worst, and Average Case

- Best Case: The best case refers to the scenario where the algorithm performs the fewest possible steps. This happens when the input is ideal, meaning the algorithm can process the data in the most efficient way possible. This is usually our Lower bound.
- The worst case represents the scenario where the algorithm performs the maximum number of steps possible, which occurs when the input is arranged in the most difficult way for the algorithm to handle. This is usually our upper bound.
- The average case refers to the expected performance of the algorithm when it processes a "typical" or randomly distributed input. The average case provides a more realistic expectation of the algorithm’s performance, especially for randomized or real-world data.

---

# Asymptotic notations

<style>
p, li {
    font-size: 0.7rem;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
}
</style>

We often use asymptotic notations to describe the order of growth of algorithms.

Big O notation: The Big O notation describes the upper bound of an algorithm's running time. It represents the worst-case scenario, providing an upper limit on the algorithm's performance.
Formal definition: 

$f(n) = O(g(n)) \quad \exists n_0,c \quad \forall n \geq n_0 : f(n) \leq c \cdot g(n)$

This definition states that f(n) is O(g(n)) if there exist positive constant $c$ and $n_0$, such that for all $n \geq n_0$, the value of $f(n)$ is less than or equal to $c \cdot g(n)$.

Big Omega notation: The Big Omega notation describes the lower bound of an algorithm's running time. It represents the best-case scenario, providing a lower limit on the algorithm's performance.
Formal definition:

$f(n) = \Omega(g(n)) \quad \exists n_0,c \quad \forall n \geq n_0 : f(n) \geq c \cdot g(n)$

This definition states that f(n) is $\Omega(g(n))$ if there exist positive constant $c$ and $n_0$, such that for all $n \geq n_0$, the value of $f(n)$ is greater than or equal to $c \cdot g(n)$.

Big Theta notation: The Big Theta notation describes the tight bound of an algorithm's running time. This represents an optimal order of growth for an algorithm.

So, if we found that $f(n) = O(g(n))$ AND $f(n) = \Omega(g(n))$ - that means that $f(n) = \Theta(g(n))$


---

### Let's consider the following algorithm

<style>
p, li {
    font-size: 0.45rem;
    line-height: 0.9rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}
</style>

```ts
function oneSum(nums: Array<number>): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count++;
        }
    }
    return count;
}
```

we remember that the math model for this algorithm is $f(n) = 4N + 6$

now we can find $c$ and $n_0$ for Big O notation:

$4N + 6 \leq c \cdot N$

we can use $c$ = 5 and $n_0$ = 6

$4 \cdot 6 + 6 \leq 5 \cdot 6 = 30 \leq 30$ , So $f(n) = O(N)$

now we can find $c$ and $n_0$ for Big Omega notation:

$4N + 6 \geq c \cdot N$

we can use $c$ = 1 and $n_0$ = 0

$4 \cdot 0 + 6 \geq 1 \cdot 0 = 6 \geq 0$ , So $f(n) = \Omega(N)$

Since, $f(n) = O(n)$ and $f(n) = \Omega(n)$, we can say that $f(n) = \Theta(n)$, meaning this algorithm is optimal.

---

### Let's consider the following algorithm

<style>
p, li {
    font-size: 0.45rem;
    line-height: 0.9rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}
</style>

```ts
function twoSum(nums: Array<number>): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === 0) {
                count++;
            }
        }
    }
    return count;
}
```

We remember that the math model for this algorithm is $f(n) = 4N^2 + 5N + 3$

now we can find $c$ and $n_0$ for Big O notation:

$4N^2 + 5N + 3 \leq c \cdot N^2$

we can use $c$ = 5 and $n_0$ = 6

$4 \cdot 6^2 + 5 \cdot 6 + 3 \leq 5 \cdot 6^2 = 159 \leq 180$ , So $f(n) = O(N^2)$

now we can find $c$ and $n_0$ for Big Omega notation:

$4N^2 + 5N + 3 \geq c \cdot N^2$

we can use $c$ = 1 and $n_0$ = 0

$4 \cdot 0^2 + 5 \cdot 0 + 3 \geq 1 \cdot 0 = 3 \geq 0$ , So $f(n) = \Omega(N^2)$

but, we can make an assumption that lower bound should be at least $N$, because we have visit every number in the array to possibly solve the problem.
So, our assumption is $f(n) = \Omega(N)$

If out lower bound assumption is correct, this means that we can potentially lower upper bound, meaning implement faster algorithm.

And indeed we can solve this algorithm faster, by using a hash table to store the numbers we have visited or by sorting the array and using two pointers.

---
layout: image-right
image: img/amortized.png
backgroundSize: contain
---

# Amortized Analysis

<style>
p, li {
    font-size: 0.6rem;
    line-height: 0.9rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}
</style>

Amortized analysis is a technique used to analyze the average time complexity of operations in an algorithm over a sequence of operations, rather than analyzing the time complexity of each operation individually. This analysis is useful when an algorithm has both expensive and cheap operations, and it helps to provide a more accurate understanding of the overall efficiency.

Amortized analysis looks at the total cost of a series of operations, and then divides it by the number of operations to find an "average" cost per operation.

It is most commonly used to analyze data structures with operations that have varying costs (example: dynamic arrays)

Example:
We start with an array of size 1.
When the array reaches its capacity, we resize the array by doubling its size, and all existing elements need to be copied to the new array.
Each insertion after resizing takes constant time 𝑂(1), but resizing takes O(n) because all elements must be copied.

Let's analyze the amortized cost of 5 insertions.

- Insert 1st element: no-resizing needed, and we insert the first element.
- Insert 2nd element: The array is full, so we need to resize the array to size 2, resize cost: copy 1 element is O(1) and insert cost is O(1), so the total cost is O(2).
- Insert 3rd element: no re-sizing needed, insert cost is O(1).
- Insert 4th element: The array is full, so we need to resize the array to size 4, resize cost: copy 2 elements is O(2) and insert cost is O(1), so the total cost is O(3).
- Insert 5th element: no re-sizing needed, insert cost is O(1).

Amortized const per insertion: $O(1) + O(2) + O(1) + O(3) + O(1) = \frac{O(8)}{5} = O(1.6)$


---

# Example 1

```ts
for (let i = 0; i < n; i++) {
    console.log(i);
}
```

<p v-click class="opacity-50">
O(N)
</p>

---

# Example 2

```ts
for (let i = 0; i < n; i += 2) {
    console.log(i);
}
```

<p v-click class="opacity-50">
The loop runs N/2 times, so the time complexity is O(N)
</p>

---

# Example 3

```ts
for (let i = 0; i < n; i *= 2) {
    console.log(i);
}
```

<p v-click class="opacity-50">
The loop runs log(N) times, so the time complexity is O(log(N))
</p>

---

# Example 4

```ts
for (let i = 0; i < n - 1; i++) {
    for (let j = i+1; j < n; j++) {
      console.log(i, j);  
    }
}
```

<p v-click class="opacity-50">
The inner loop runs N times for the first iteration of the outer loop, N-1 times for the second iteration, and so on. The total number of iterations is N + (N-1) + (N-2) + ... + 1 = N*(N-1)/2, which is O(N^2).
</p>

---

# Example 5

```ts
function f(n) {
    if (n === 0) {
        return;
    }
    
    f(n - 1);
}
```

<p v-click class="opacity-50">
The function calls itself recursively n times, so the time complexity is O(N). Since it is recursive, the space complexity is also O(N) due to the call stack.
</p>


---

# Example 6

```ts
function f(n) {
    if (n === 0) {
        return;
    }
    
    f(n / 2);
}
```

<p v-click class="opacity-50">
The function calls itself recursively log(N) times, so the time complexity is O(log(N)). Since it is recursive, the space complexity is also O(log(N)) due to the call stack.
</p>

---

# Example 7
```ts
function f(n) {
    if (n === 0) {
        return;
    }
    
    f(n / 2);
    f(n / 2);
}
```

<p v-click class="opacity-50">
The function calls itself recursively 2*log(N) times. 

This will build the tree with height H = $log_2{N}$, so total nodes of this tree will be $2^{H} = 2^{log_2{N}}$.

So the total number of nodes is N. So the time complexity is O(N).
</p>
