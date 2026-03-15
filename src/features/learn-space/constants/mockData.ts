import type { QuizQuestion, ExamQuestion, Flashcard, Note, Summary } from "../types";

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    type: "mcq",
    question:
      "According to the ML Fundamentals doc, what is the primary role of backpropagation?",
    options: [
      {
        id: "1",
        text: "To initialize the weights randomly before training start.",
        isCorrect: false,
      },
      {
        id: "2",
        text: "To calculate gradients of the loss function with respect to weights.",
        isCorrect: true,
      },
      {
        id: "3",
        text: "To compress the model size for edge deployment.",
        isCorrect: false,
      },
      {
        id: "4",
        text: "To visualize the hidden layers in a 3D plot.",
        isCorrect: false,
      },
    ],
    answer: "2",
    explanation:
      "Backpropagation computes the gradient of the loss function for a single weight by the chain rule, iteratively from the last layer back to the first.",
  },
  {
    id: "q2",
    type: "mcq",
    question:
      "Which architecture is noted as being best for spatial data like images?",
    options: [
      { id: "1", text: "Recurrent Neural Networks (RNN)", isCorrect: false },
      { id: "2", text: "Multi-layer Perceptron (MLP)", isCorrect: false },
      { id: "3", text: "Convolutional Neural Networks (CNN)", isCorrect: true },
      {
        id: "4",
        text: "Generative Adversarial Networks (GAN)",
        isCorrect: false,
      },
    ],
    answer: "3",
    explanation:
      "CNNs use convolutional layers that preserve spatial hierarchies, making them ideal for image-related tasks.",
  },
];

export const MOCK_EXAM: ExamQuestion[] = [
  ...MOCK_QUIZ.map((q) => ({ ...q, points: 10 })),
  {
    id: "e1",
    type: "mcq",
    question: 'In Deep Learning, what does "overfitting" generally indicate?',
    options: [
      {
        id: "a",
        text: "The model has too few parameters to learn the pattern.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "The model performs better on training data than on unseen data.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "The training process has completed too quickly.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "The learning rate is too small for the optimizer.",
        isCorrect: false,
      },
    ],
    answer: "b",
    points: 20,
    explanation:
      "Overfitting happens when a model fits the training data (including noise) so closely that it fails to generalize to new data.",
  },
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: "f1",
    front: "Hyperparameter",
    back: "A parameter whose value is set before the learning process begins, like learning rate or batch size.",
    confidence: "unrated",
  },
  {
    id: "f2",
    front: "Activation Function",
    back: "A mathematical function applied to a neuron's output to introduce non-linearity, like ReLU or Sigmoid.",
    confidence: "unrated",
  },
  {
    id: "f3",
    front: "Epoch",
    back: "One complete pass through the entire training dataset during the learning process.",
    confidence: "unrated",
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "n1",
    title: "Executive Summary: AI Fundamentals",
    content:
      'Deep Learning is a subset of Machine Learning based on artificial neural networks. The core idea is "learning representations" through multiple layers of abstraction. Key breakthroughs include CNNs for vision, RNNs/Transformers for sequences, and advanced optimizers like Adam.',
    isAIGenerated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["ai", "fundamentals", "deep-learning"],
  },
  {
    id: "n2",
    title: "Exam Preparation Points",
    content:
      "- Focus on Gradient Descent variations\n- Review Regularization techniques (Dropout, L2)\n- Understand the bias-variance tradeoff",
    isAIGenerated: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["exam", "prep"],
  },
];

export const MOCK_SUMMARY: Summary = {
  overview: "This document provides a comprehensive overview of Machine Learning fundamentals, focusing on deep neural networks, their architectures, and training methodologies. It covers the transition from traditional ML to deep representation learning.",
  keyTakeaways: [
    "Deep Learning identifies patterns through hierarchical layers of abstraction.",
    "Backpropagation and Gradient Descent are the engines of neural network training.",
    "CNNs revolutionized computer vision by preserving spatial relationships.",
    "Transformers have become the state-of-the-art for natural language processing."
  ],
  mainTopics: [
    {
      id: "t1",
      title: "Neural Network Architectures",
      description: "Exploration of CNNs, RNNs, and Transformers and their specific use cases in modern AI."
    },
    {
      id: "t2",
      title: "Optimization Techniques",
      description: "Overview of loss functions, learning rates, and optimizers like Adam and SGD."
    },
    {
      id: "t3",
      title: "Model Evaluation",
      description: "Methods for assessing performance, including precision, recall, and F1-score."
    }
  ]
};
