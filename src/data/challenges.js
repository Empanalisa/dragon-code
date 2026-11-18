// Stack Village questions (from docs/challenges/stacks.md).
// stack: the items in the stack picture, top item first. Use null for no picture.
// correctIndex: counts from 0, so 2 = the third answer.
export const challenges = [
  {
    id: 'stack-1',
    question: 'A stack holds 10, 20, 30 with 30 on top. What does pop() remove?',
    stack: [30, 20, 10],
    answers: ['10', '20', '30', 'All three'],
    correctIndex: 2,
    hint: 'A stack only lets you touch one end. Which item is on top?',
    explanation: 'Stacks are LIFO: Last In, First Out. 30 went in last, so pop() removes 30.',
  },
  {
    id: 'stack-2',
    question: 'You start with an empty stack and run push(5), push(8), pop(), push(3). What is on top now?',
    stack: null,
    answers: ['5', '8', '3', 'The stack is empty'],
    correctIndex: 2,
    hint: 'Draw the stack after each step. What does pop() take away before the last push?',
    explanation: 'push(5) and push(8) leave 8 on top. pop() removes 8, so only 5 is left. Then push(3) puts 3 on top.',
  },
  {
    id: 'stack-3',
    question: 'A stack holds 4, 7, 9 with 9 on top. You call peek(). What happens?',
    stack: [9, 7, 4],
    answers: [
      'It returns 9 and removes it',
      'It returns 9 and the stack stays the same',
      'It returns 4 and the stack stays the same',
      'It removes every item',
    ],
    correctIndex: 1,
    hint: 'peek() and pop() both look at the same item, but only one of them changes the stack.',
    explanation: 'peek() lets you look at the top item without removing it. It returns 9 and the stack is still 4, 7, 9. pop() is the one that removes.',
  },
];

// Queue Village questions.
// queue: the items in the queue picture, FRONT item first. Use null for no picture.
export const queueChallenges = [
  {
    id: 'queue-1',
    question: 'A queue holds 4, 7, 9. 4 joined first. What does dequeue() remove?',
    queue: [4, 7, 9],
    answers: ['4', '7', '9', 'All three'],
    correctIndex: 0,
    hint: 'A queue is like a line at a store. Who has been waiting the longest?',
    explanation: 'Queues are FIFO: First In, First Out. 4 joined first, so dequeue() removes 4 from the front.',
  },
  {
    id: 'queue-2',
    question: 'Which operation adds an item to the back of a queue?',
    queue: null,
    answers: ['dequeue()', 'enqueue()', 'peek()', 'pop()'],
    correctIndex: 1,
    hint: 'One of these removes from the front, and one belongs to stacks. Which one adds?',
    explanation: 'enqueue() adds an item to the back of the queue. dequeue() removes the item at the front.',
  },
  {
    id: 'queue-3',
    question: 'You start with an empty queue and run enqueue(1), enqueue(2), enqueue(3), dequeue(). What is at the front now?',
    queue: null,
    answers: ['1', '2', '3', 'The queue is empty'],
    correctIndex: 1,
    hint: 'Draw the line after each step. dequeue() always takes from the front.',
    explanation: 'After the three enqueues the line is 1, 2, 3 with 1 at the front. dequeue() removes 1, so 2 is now at the front.',
  },
];

// Array Forest questions.
// array: the items in the array picture, index 0 first. Use null for no picture.
export const arrayChallenges = [
  {
    id: 'array-1',
    question: 'An array holds [8, 3, 5, 1]. What is the value at index 2?',
    array: [8, 3, 5, 1],
    answers: ['3', '5', '1', '8'],
    correctIndex: 1,
    hint: 'Array indexes start at 0, not 1. The first box is index 0.',
    explanation: 'Indexes start at 0: index 0 is 8, index 1 is 3, and index 2 is 5.',
  },
  {
    id: 'array-2',
    question: 'An array has 6 items. What is the index of the last item?',
    array: null,
    answers: ['6', '5', '7', '0'],
    correctIndex: 1,
    hint: 'If the first index is 0, what number do you reach when you count 6 boxes?',
    explanation: 'Indexes go from 0 to length − 1. With 6 items, the last index is 6 − 1 = 5.',
  },
  {
    id: 'array-3',
    question: 'nums = [2, 4, 6]. After nums[1] = 9, what is nums?',
    array: [2, 4, 6],
    answers: ['[9, 4, 6]', '[2, 9, 6]', '[2, 4, 9]', '[2, 4, 6, 9]'],
    correctIndex: 1,
    hint: 'nums[1] means the box at index 1. Remember the first box is index 0.',
    explanation: 'nums[1] is the second box. Setting it to 9 replaces 4, so the array becomes [2, 9, 6].',
  },
];

// One entry per village: its name, the topic word, the pill color, and its questions.
export const VILLAGES = {
  stack: { name: 'Stack Village', topic: 'stack', color: 'var(--stack)', questions: challenges },
  queue: { name: 'Queue Village', topic: 'queue', color: '#9ADCF0', questions: queueChallenges },
  array: { name: 'Array Forest', topic: 'array', color: '#A3E3B4', questions: arrayChallenges },
};
