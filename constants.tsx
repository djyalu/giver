
import { Character, ChapterSummary, Theme, QuizQuestion, VocabularyWord } from './types';

export const BOOK_TITLE = "The Giver";
export const AUTHOR = "Lois Lowry";

export const CHARACTERS: Character[] = [
  {
    name: "Jonas",
    role: "The Protagonist / Receiver of Memory",
    description: "짧은 갈색 머리에 하이 칼라의 리넨 셔츠를 입은 진지하고 사려 깊은 소년입니다. '사물을 넘어선 곳을 보는 능력'을 가졌으며, 공동체의 무채색 삶 속에서 처음으로 변화를 감지하기 시작합니다.",
    image: "A realistic cinematic portrait of a serious 12-year-old boy with short brown hair, wearing a high-collared grey linen shirt. He has intense, pale eyes that seem to see more than others. Dystopian minimalist background, grey scale style with a hint of color emerging.",
    symbolism: "개인성과 지식의 무게, 그리고 진실을 마주하는 용기."
  },
  {
    name: "The Giver",
    role: "The Mentor / Current Receiver",
    description: "수많은 책으로 둘러싸인 방에 거주하는, 길고 흰 머리와 수염을 가진 지혜로운 노인입니다. 인류의 모든 기억을 혼자 짊어지고 있어 늘 피로해 보이지만, 조나스에게 세상을 전달하는 중요한 스승입니다.",
    image: "A realistic portrait of an elderly man with long white hair and a thick white beard. He looks weary and weighed down by memories. He is sitting in a room filled with thousands of old books on shelves. Cinematic, dramatic lighting.",
    symbolism: "지혜, 고통, 그리고 인간 역사의 감정적 깊이."
  },
  {
    name: "Gabriel (Gabe)",
    role: "The Newchild",
    description: "조나스와 같은 밝은색 눈을 가진 아기로, 이름이 새겨진 부드러운 리넨 천에 싸여 있습니다. 밤에 잠들지 못해 고통받지만 조나스가 전달하는 기억을 통해 안정을 찾는, 희망의 상징입니다.",
    image: "A close-up realistic portrait of a beautiful baby with bright, curious pale eyes. The baby is wrapped in a soft, light grey linen blanket with a name tag visible. Soft, ethereal lighting.",
    symbolism: "순수함, 생명의 가치, 그리고 더 나은 미래."
  },
  {
    name: "Asher",
    role: "Jonas's Best Friend",
    description: "헝클어진 갈색 머리와 얼굴 가득한 주근깨, 그리고 해맑은 미소를 지닌 소년입니다. 활기차고 장난기 가득한 성격이지만, 공동체의 엄격한 '언어의 정확성' 규칙 때문에 자주 지적을 받습니다.",
    image: "A realistic portrait of a cheerful 12-year-old boy with messy brown hair and many freckles on his face. He is laughing or smiling broadly, wearing a simple grey community tunic. Vibrant energy despite the controlled environment.",
    symbolism: "개성이 거세된 사회에서의 단순한 즐거움과 순응."
  },
  {
    name: "Fiona",
    role: "Jonas's Friend",
    description: "붉은빛이 감도는 갈색 머리와 차분하고 온화한 분위기를 가진 소녀입니다. 노인 거주 시설에서 봉사하며 타인을 돌보는 따뜻한 마음씨를 가졌으며, 조나스가 처음으로 깊은 감정을 느끼게 되는 대상입니다.",
    image: "A realistic portrait of a calm 12-year-old girl with auburn (red-tinged) hair tied back neatly. She has a gentle and caring expression, wearing a grey medical attendant tunic. Soft, warm lighting.",
    symbolism: "억압된 인간의 애정과 로맨스, 감정의 아름다움."
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
  { word: "Solace", definition: "위안, 위로", context: "He find solace in the quiet memories.", chapter: 21 },
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
