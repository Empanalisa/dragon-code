# Stack Village Challenges

Three beginner-friendly CS1 questions about **stacks**. A stack is LIFO: **L**ast **I**n, **F**irst **O**ut. You can only add (`push`) or remove (`pop`) at the top.

Each correct answer is worth **10 coins** (see [reward-rules.md](reward-rules.md)).

---

## Question 1 (`stack-1`)

A stack contains 10, 20, 30, with 30 at the top. What does `pop()` remove?

```
| 30 |  ← top
| 20 |
| 10 |
```

- A. 10
- B. 20
- C. 30
- D. All three

**Correct answer:** C. 30

**Hint:** A stack only lets you touch one end. Which item is on top?

**Explanation:** A stack follows LIFO (Last In, First Out). 30 went in last, so `pop()` removes the top element, 30.

**Reward:** 10 coins

---

## Question 2 (`stack-2`)

You start with an empty stack and run these steps in order:

```
push(5)
push(8)
pop()
push(3)
```

What is on top of the stack now?

- A. 5
- B. 8
- C. 3
- D. The stack is empty

**Correct answer:** C. 3

**Hint:** Draw the stack after each step. What does `pop()` take away before the last `push`?

**Explanation:** After `push(5)` and `push(8)`, the stack is 5, 8 with 8 on top. `pop()` removes 8, leaving just 5. Then `push(3)` puts 3 on top, so the stack is 5, 3 with 3 on top.

**Reward:** 10 coins

---

## Question 3 (`stack-3`)

A stack contains 4, 7, 9, with 9 at the top. You call `peek()`. What happens?

```
| 9 |  ← top
| 7 |
| 4 |
```

- A. It returns 9 and removes it from the stack
- B. It returns 9 and the stack stays the same
- C. It returns 4 and the stack stays the same
- D. It removes every item from the stack

**Correct answer:** B. It returns 9 and the stack stays the same

**Hint:** `peek()` and `pop()` both look at the same item, but only one of them changes the stack.

**Explanation:** `peek()` (sometimes called `top()`) lets you look at the top item without removing it. It returns 9, and the stack is still 4, 7, 9. `pop()` is the one that removes the top item.

**Reward:** 10 coins
