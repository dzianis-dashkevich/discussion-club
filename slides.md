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





