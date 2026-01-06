
import { Character, ChapterSummary, Theme, QuizQuestion } from './types';

export const BOOK_TITLE = "The Giver";
export const AUTHOR = "Lois Lowry";

export const CHARACTERS: Character[] = [
  {
    name: "Jonas",
    role: "The Protagonist / Receiver of Memory",
    description: "An Eleven (at the start) who is sensitive and intelligent. He is selected to be the next Receiver of Memory because he has the 'Capacity to See Beyond'.",
    symbolism: "Representing individuality and the burden of knowledge."
  },
  {
    name: "The Giver",
    role: "The Mentor / Current Receiver",
    description: "An old man who holds the memories of the world's past and transmits them to Jonas. He is weary from the weight of his burden.",
    symbolism: "Wisdom and the emotional depth of human history."
  },
  {
    name: "Gabriel (Gabe)",
    role: "The Newchild",
    description: "A baby who struggles to sleep and is cared for by Jonas's family. He also has pale eyes and the capacity to receive memories.",
    symbolism: "Hope, innocence, and the future."
  },
  {
    name: "Asher",
    role: "Jonas's Best Friend",
    description: "Cheerful and fun-loving, but often struggles with 'precision of language'. He is assigned to be Assistant Director of Recreation.",
    symbolism: "The loss of depth in a society centered on Sameness."
  },
  {
    name: "Fiona",
    role: "Jonas's Friend",
    description: "A calm, gentle female assigned to be Caretaker of the Old. Jonas has his first 'Stirrings' about her.",
    symbolism: "The suppression of human emotion and romance."
  }
];

export const CHAPTERS: ChapterSummary[] = [
  {
    chapter: 1,
    title: "The Feeling of Fear",
    summary: "Jonas feels apprehensive about the upcoming Ceremony of Twelve. We learn about the community's strict rules, like the punishment of 'release'.",
    keyEvents: ["The pilot-in-training flies over the community", "Ritual of sharing feelings", "Discussion of 'Release'"]
  },
  {
    chapter: 2,
    title: "Assignments and Expectations",
    summary: "Jonas's father tells the story of his own Ceremony and mentions Gabriel, a struggling newchild. The Elders meticulously observe children to give them Assignments.",
    keyEvents: ["Story of Father's assignment as Nurturer", "Learning about the Committee of Elders", "The upcoming December ceremony"]
  },
  {
    chapter: 3,
    title: "Pale Eyes and the Apple",
    summary: "Gabe arrives at the dwelling. Jonas notices he has pale eyes like himself. Jonas recalls a strange incident where an apple seemed to 'change' in mid-air.",
    keyEvents: ["Gabe arrives as a temporary guest", "The apple 'changes'", "Mention of Birthmothers having little honor"]
  },
  {
    chapter: 4,
    title: "Volunteer Hours",
    summary: "Jonas completes his final volunteer hours at the House of the Old with Fiona and Asher. He learns about the release ceremony for the elderly.",
    keyEvents: ["Bathing Larissa", "Description of Roberto's release ceremony", "Freedom of choice in volunteer hours"]
  },
  {
    chapter: 8,
    title: "The Selection",
    summary: "Jonas is not assigned; he is selected to be the Receiver of Memory. The Chief Elder explains the five required qualities.",
    keyEvents: ["Jonas is skipped in the line", "Selection as Receiver of Memory", "Intelligence, Integrity, Courage, Wisdom, and Seeing Beyond"]
  }
];

export const THEMES: Theme[] = [
  {
    title: "The Importance of Memory",
    description: "The community has chosen to forget the past to avoid pain, but without memory, they lack true happiness and wisdom.",
    examples: ["The Giver transmitting memories of snow and sunshine", "Jonas realizing that without pain, there is no joy"]
  },
  {
    title: "Individual vs. Society (Sameness)",
    description: "The community values Sameness (conformity) over everything else, eliminating choice, color, and diversity to maintain order.",
    examples: ["Matching of spouses", "Precision of language", "Removal of hills and climate"]
  },
  {
    title: "The Value of Human Emotion",
    description: "Emotions like love, grief, and passion are suppressed by 'the pills' and the community structure.",
    examples: ["Jonas asking his parents if they love him", "The 'Stirrings' and their medical suppression"]
  }
];

export const COMMUNITY_RULES = [
  "Two children (one male, one female) per family unit.",
  "Report all 'Stirrings' for immediate treatment.",
  "Use precision of language at all times.",
  "No pilot may fly over the community.",
  "Public apology is required for all minor transgressions.",
  "Objects must not be removed from the recreation area.",
  "Release is the ultimate punishment for three transgressions."
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary reason the community chose 'Sameness'?",
    options: ["To save money", "To eliminate war and pain", "To make everyone taller", "Because they forgot how to build hills"],
    correctAnswer: 1,
    explanation: "Sameness was implemented to remove conflict, hunger, and pain from the community, though it also removed beauty and choice."
  },
  {
    id: 2,
    question: "Which quality does Jonas NOT yet possess when he is selected?",
    options: ["Intelligence", "Integrity", "Wisdom", "Courage"],
    correctAnswer: 2,
    explanation: "The Chief Elder notes that wisdom will come through his training with The Giver."
  },
  {
    id: 3,
    question: "What is the first color Jonas begins to see?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correctAnswer: 2,
    explanation: "Jonas first sees red in the apple, then in the audience's faces, and then in Fiona's hair."
  },
  {
    id: 4,
    question: "What does 'Release' actually mean in the community?",
    options: ["Retirement to a farm", "Moving to another city", "Lethal injection", "Going on a long vacation"],
    correctAnswer: 2,
    explanation: "Jonas discovers through a video that 'release' is actually the practice of euthanasia."
  }
];
