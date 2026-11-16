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
