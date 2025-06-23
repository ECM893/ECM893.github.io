---
layout: distill
title: Neural Net Optimization, Part 1 — The Computational Graph
date: 2025-05-23
author: ECM
description: The first in a four-part series exploring neural network optimization, starting from scratch with a toy computational graph and building up to scalable, practical ML systems.
tags: [ML, neural-networks, optimization, computational-graph, pytorch, hyperparameters]
categories: blog-posts
image: /assets/images/neural-net-graph.png
chart:
  plotly: true
---

# In the Beginning

Welcome to the first post in a three-part series on neural network optimization! My goal is to share a practical perspective on how the scale and complexity of neural network optimization evolves, especially for those who, like me, started without much formal training. Over the years, I’ve helped several early-stage companies move from a handful of Jupyter notebooks to more robust, scalable ML workflows. This series chronicles that journey and the lessons learned along the way.

## Three Levels of Neural Network Implementation

1. **Computational Graph:**  
   A simple computational graph network, built from scratch, capable of a forward pass (post-order traversal) and auto-differentiation (backward pass) to fit any defined network to a set of data points.

2. **PyTorch Example:**  
   A minimal PyTorch implementation, capable of more complex learning on a basic multilayer perceptron. This demonstrates how frameworks can simplify and scale up what’s possible.

3. **Scaling Up:**  
   The real-world challenge: distributing training and tuning across multiple GPUs, or running many experiments in parallel on a single GPU.

---

## The Repository

All code for this post is available on [GitHub](https://github.com/ECM893/computational_graph).

---

# The Computational Graph

This is the third time in my life I’ve built this example from scratch, and I promise myself it’ll be the last! But it’s a fantastic way to understand the basics of neural networks, how they’re optimized, and why frameworks like PyTorch exist.

**If you’ve ever wondered what’s happening “under the hood” in PyTorch or TensorFlow, this is it: at their core, these frameworks build and manipulate computational graphs just like this one—except they do it automatically, at scale, and with hardware acceleration. Every neural network you define in PyTorch is internally represented as a computational graph, where each operation (like addition, multiplication, or activation functions) becomes a node, and the framework handles the forward and backward passes for you.**

The computational graph here is made from a few simple nodes (constants, inputs, addition, multiplication, and power). A graph object manages these nodes, letting us interact with the network as a whole rather than node-by-node.

---

## Why This Is Hard to Scale

While building a computational graph from scratch is a great learning exercise, it quickly becomes impractical for real-world ML tasks, for two key reasons:

### 1. Complexity and Scalability

- **Manual Graph Construction:**  
  Every operation and connection must be explicitly defined. As our network grows, this becomes tedious and error-prone.
- **No GPU Support:**  
  Hand-rolled computational graphs are CPU-bound and not designed for parallel computation. Scaling to larger models or datasets (let alone running on a GPU) is a massive challenge.
- **Debugging:**  
  When things go wrong, it’s hard to tell if the issue is with our math, our code, or our hyperparameters.

### 2. The Hyperparameter Trap

- **Tuning Is Everything:**  
  Even if our code is mathematically correct, poor hyperparameter choices (like learning rate or gradient clipping) can make our model look broken — or make a working model look perfect. The difference between “Is there a bug in my code?” and “Wow, this works perfectly!” often comes down to just a few numbers.

---

## Example: Fitting a Polynomial

Take the example in my repository, `example_polynomial_fit.py`.  
It fits a dataset of the form:

$$
y = c_0 x_1^2 + c_1 x_1 + c_2 x_2^2 + c_3 x_2 + c_4
$$

using a hand-built computational graph.

---

## The Good: When It Works

With reasonable hyperparameters, the model converges smoothly:

```python
MAX_GRAD = 1000
MIN_LR = 1e-3
LR_DECAY = 0.999
EPOCHS = 300
LR = 0.01
```

<style>
.responsive-iframe-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  overflow: hidden;
  min-height: 300px; /* Ensures visibility on mobile */
}
.responsive-iframe-container.box {
  aspect-ratio: 1 / 1;
  min-height: 250px;
}
.responsive-iframe-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  min-height: 0;
  max-height: 100%;
  border: 0;
  display: block;
  overflow: hidden;
  background: transparent;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .responsive-iframe-container {
    aspect-ratio: unset;
    min-height: 220px;
    height: 220px;
  }
  .responsive-iframe-container.box {
    aspect-ratio: unset;
    min-height: 180px;
    height: 180px;
  }
}
</style>

<div class="responsive-iframe-container">
  <iframe src="/assets/plotly/losses.html" allowfullscreen sandbox="allow-scripts allow-same-origin"></iframe>
</div>

<div class="responsive-iframe-container box">
  <iframe src="/assets/plotly/model_surface.html" allowfullscreen sandbox="allow-scripts allow-same-origin"></iframe>
</div>

---

## The Bad: When It Doesn’t

But with a bad learning rate (and uncapped gradients), the solution becomes unstable and never converges:

```python
MAX_GRAD = 1e10
MIN_LR = 1e-3
LR_DECAY = 1
EPOCHS = 300
LR = 0.1
```


<div class="responsive-iframe-container">
  <iframe src="/assets/plotly/losses_bad.html" allowfullscreen sandbox="allow-scripts allow-same-origin"></iframe>
</div>

<div class="responsive-iframe-container box">
  <iframe src="/assets/plotly/model_surface_bad.html" allowfullscreen sandbox="allow-scripts allow-same-origin"></iframe>
</div>

---

## Key Takeaways

- **Building from scratch is educational, but not scalable.**  
  As soon as we want to build even simple perceptron or run on a GPU, we'll hit a wall.
- **Hyperparameters matter as much as code.**  
  The right settings can make our model look brilliant; the wrong ones can make us question everything.
- **Frameworks exist for a reason.**  
  PyTorch and TensorFlow automate graph construction, GPU support, and much of the tuning process so that we can focus on solving real problems.

---

*In [Part 2](./2025-06-06-ml-levels-pt-two), we’ll see how PyTorch implements neurons to build practical neural networks, using key concepts of computational graphs.*
