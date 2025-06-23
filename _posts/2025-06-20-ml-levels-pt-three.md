---
layout: distill
title: Neural Net Optimization, Part 3 — PyTorch and PyTorch Lightning
date: 2025-06-20
author: ECM
description: The third in a four-part series on neural network optimization, focusing on PyTorch fundamentals, abstraction with PyTorch Lightning, and the ongoing challenge of hyperparameter tuning.
tags: [ML, neural-networks, optimization, pytorch, pytorch-lightning, hyperparameters]
categories: blog-posts
image: /assets/images/pytorch-vs-lightning.png
chart:
  plotly: true
---

# PyTorch and Other Tools

Let's talk about a problem that I come across frequently: Training loops for any type of neural net architecture can be rather involved and inflexible, yet despite their complexity, they all rely on very similar boilerplate code. Starting out, or even for experienced developers, it can be very frustrating indeed to debug and notice that you've dropped a model.train() somewhere in your code, or that you forgot to call model.eval() before running inference.

I so wish I had known about [PyTorch Lightning](https://www.pytorchlightning.ai/) when starting out.

PyTorch Lightning wraps PyTorch models in a class that handles training loops as part of methods of its same class, so that you do not need to explicitly write the loops! All we need to do is give the PyTorch Lightning object our optimization criteria, stoppage criteria, etc. 

Let's briefly compare how you might implement a simple neural network in both PyTorch and PyTorch Lightning, and discuss why you might choose one over the other.

## Minimal PyTorch Example

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Simple model
def make_model():
    return nn.Sequential(
        nn.Linear(1, 16),
        nn.ReLU(),
        nn.Linear(16, 1)
    )

model = make_model()
optimizer = optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

# Training loop (boilerplate)
for epoch in range(100):
    optimizer.zero_grad()
    y_pred = model(x)
    loss = loss_fn(y_pred, y)
    loss.backward()
    optimizer.step()
```

## PyTorch Lightning Example

```python
import pytorch_lightning as pl
import torch.nn as nn
import torch.optim as optim

class LitModel(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(1, 16),
            nn.ReLU(),
            nn.Linear(16, 1)
        )
        self.loss_fn = nn.MSELoss()

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_pred = self(x)
        loss = self.loss_fn(y_pred, y)
        return loss

    def configure_optimizers(self):
        return optim.Adam(self.parameters(), lr=0.01)

# Trainer handles loops, logging, etc.
# trainer = pl.Trainer(max_epochs=100)
# trainer.fit(LitModel(), dataloader)
```

### Why Use PyTorch Lightning?
- **Removes boilerplate:** Handles training loops, logging, checkpointing, and more.
- **Scalability:** Makes it easy to scale to multiple GPUs or TPUs.
- **Reproducibility:** Standardizes code structure, making experiments easier to reproduce.

### Why Use PyTorch (NOT PyTorch Lightning)?
- **Full control needed:** If you need to customize every detail of the training loop or use highly experimental features, raw PyTorch may be preferable.
- **Very simple scripts:** For quick experiments or teaching, plain PyTorch can be more transparent.

---

## Hyperparameter Optimization: The Next Challenge

PyTorch Lightning helps reduce code clutter, but it doesn't solve the problem of choosing the right hyperparameters. In fact, as models become more complex, the number of hyperparameters grows rapidly:

- **Learning rate, batch size, optimizer type**
- **Number of layers, layer sizes, activation functions**
- **Dropout rates, weight decay, initialization schemes**
- **Data augmentation parameters**
- **Scheduler settings, early stopping criteria**
- **Architecture choices (e.g., skip connections, normalization layers)**

Even the number of layers, their types, and their sizes become hyperparameters! The search space can be enormous, and brute-force search is rarely practical.

This leads to the next major challenge: **hyperparameter optimization**. Even with all the boilerplate removed, finding the best configuration is still a hard problem—just as we saw with simpler models in Part 1.

---

*In Part 4, we'll explore strategies for navigating this vast hyperparameter space using a package/api called `ray`, from grid search to implement more advanced optimization techniques.*

