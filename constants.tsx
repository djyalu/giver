
import { Character, ChapterSummary, Theme, QuizQuestion, VocabularyWord } from './types';

export const BOOK_TITLE = "The Giver";
export const AUTHOR = "Lois Lowry";

export const CHARACTERS: Character[] = [
  {
    name: "Jonas",
    role: "The Protagonist / Receiver of Memory",
    description: "An Eleven (at the start) who is sensitive and intelligent. He is selected to be the next Receiver of Memory because he has the 'Capacity to See Beyond'.",
    image: "jonas.jpg",
    symbolism: "Representing individuality and the burden of knowledge."
  },
  {
    name: "The Giver",
    role: "The Mentor / Current Receiver",
    description: "An old man who holds the memories of the world's past and transmits them to Jonas. He is weary from the weight of his burden.",
    image: "giver.jpg",
    symbolism: "Wisdom and the emotional depth of human history."
  },
  {
    name: "Gabriel (Gabe)",
    role: "The Newchild",
    description: "A baby who struggles to sleep and is cared for by Jonas's family. He also has pale eyes and the capacity to receive memories.",
    image: "gabriel.jpg",
    symbolism: "Hope, innocence, and the future."
  },
  {
    name: "Asher",
    role: "Jonas's Best Friend",
    description: "Cheerful and fun-loving, but often struggles with 'precision of language'. He is assigned to be Assistant Director of Recreation.",
    image: "asher.jpg",
    symbolism: "The loss of depth in a society centered on Sameness."
  },
  {
    name: "Fiona",
    role: "Jonas's Friend",
    description: "A calm, gentle female assigned to be Caretaker of the Old. Jonas has his first 'Stirrings' about her.",
    image: "fiona.jpg",
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

export const VOCABULARY_WORDS: VocabularyWord[] = [
  { word: "Ironic", definition: "반어적인, 비꼬는 (예상과 반대되는 상황)", context: "It was almost ironic that the pilot was lost.", chapter: 1 },
  { word: "Palpable", definition: "손에 만져질 듯한, 뚜렷한", context: "Now the thinking part of him said that it would be a palpable relief.", chapter: 1 },
  { word: "Apprehensive", definition: "걱정되는, 불안한", context: "Jonas was careful about his use of language... He was apprehensive.", chapter: 1 },
  { word: "Nurturer", definition: "양육자 (아이들을 돌보는 직업)", context: "Jonas's father was a Nurturer.", chapter: 1 },
  { word: "Transgression", definition: "위반, 범죄", context: "The rules say that if there's a third transgression, he simply has to be released.", chapter: 1 },
  { word: "Adherence", definition: "고수, 충실한 준수", context: "The Committee of Elders was responsible for the adherence to rules.", chapter: 2 },
  { word: "Aptitude", definition: "적성, 소질", context: "The Elders observed each child's aptitude.", chapter: 2 },
  { word: "Chastisement", definition: "징벌, 호된 꾸짖음", context: "It was a minor rule, rather like the one about chastisement.", chapter: 3 },
  { word: "Petulantly", definition: "심술궂게, 까다롭게", context: "I think I'd like that, Lily said petulantly.", chapter: 3 },
  { word: "Remorse", definition: "후회, 자책", context: "No one had mentioned it, but the remorse was there.", chapter: 3 },
  { word: "Mystified", definition: "어리둥절하게 하는", context: "Jonas had been mystified by the incident with the apple.", chapter: 3 },
  { word: "Nondescript", definition: "특징 없는, 평범한", context: "The apple remained the same nondescript shade.", chapter: 3 },
  { word: "Chortled", definition: "깔깔거리며 웃다", context: "Larissa chortled with delight as Jonas bathed her.", chapter: 4 },
  { word: "Relinquished", definition: "포기한, 양도한", context: "They relinquished their children to the community.", chapter: 6 },
  { word: "Exuberant", definition: "활기 넘치는, 열광적인", context: "The audience gave an exuberant cheer.", chapter: 6 },
  { word: "Scrupulously", definition: "양심적으로, 세심하게", context: "The Assignments were scrupulously thought away.", chapter: 6 },
  { word: "Indolence", definition: "게으름, 나태", context: "What we observe as playfulness and purity is actually indolence.", chapter: 8 },
  { word: "Conspicuous", definition: "눈에 띄는, 뚜렷한", context: "Jonas's selection was the most conspicuous of all.", chapter: 10 },
  { word: "Admonition", definition: "훈계, 권고", context: "He remembered the admonition about precision of language.", chapter: 12 },
  { word: "Assimilated", definition: "흡수된, 동화된", context: "The memories would be assimilated and become a part of him.", chapter: 13 },
  { word: "Invigorating", definition: "기운을 돋우는, 상쾌한", context: "The memory of the sled ride was invigorating.", chapter: 14 },
  { word: "Ominous", definition: "불길한, 험악한", context: "The gray clouds looked ominous.", chapter: 15 },
  { word: "Pervaded", definition: "만연한, 구석구석 스며든", context: "The sadness pervaded the entire room.", chapter: 16 },
  { word: "Obsolete", definition: "쓸모없게 된, 구식의", context: "Climate Control made snow obsolete.", chapter: 11 },
  { word: "Rueful", definition: "후회하는, 가련한", context: "The Giver gave a rueful laugh.", chapter: 20 },
  { word: "Emphatically", definition: "단호하게, 강조하여", context: "Jonas shook his head emphatically.", chapter: 20 },
  { word: "Solace", definition: "위안, 위로", context: "He found solace in the quiet memories.", chapter: 21 },
  { word: "Stealthily", definition: "몰래, 은밀히", context: "Jonas moved stealthily through the dark streets.", chapter: 21 },
  { word: "Languid", definition: "힘없는, 나른한", context: "The river moved in a languid pace.", chapter: 22 },
  { word: "Vigilant", definition: "경계하는, 방심하지 않는", context: "He had to be vigilant for search planes.", chapter: 22 },
  { word: "Lethargy", definition: "무기력, 혼수상태", context: "A heavy lethargy took over his tired body.", chapter: 23 }
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
