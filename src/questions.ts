import { Question } from './types';

const easyQuestions: Question[] = [
  {
    text: 'What is the name of the toy cowboy in Toy Story?',
    choices: ['Buzz', 'Woody', 'Mr. Potato Head', 'Rex'],
    answer: 'B',
  },
  {
    text: 'What is the color of an emerald?',
    choices: ['Red', 'Blue', 'Green', 'Purple'],
    answer: 'C',
  },
  {
    text: 'Which is the fastest land animal?',
    choices: ['Panther', 'Falcon', 'Lion', 'Cheetah'],
    answer: 'D',
  },
  {
    text: 'Which big cat is the largest? ',
    choices: ['Tiger', 'Lion', 'Leopard', 'Jaguar'],
    answer: 'A',
  },
  {
    text: 'In which city did the Olympic games originate?',
    choices: ['Japan', 'USA', 'Greece', 'Russia'],
    answer: 'C',
  },
  {
    text: 'How many Olympic rings are there?',
    choices: ['Six', 'Five', 'Four', 'Seven'],
    answer: 'B',
  },
  {
    text: 'Who was the first US president?',
    choices: [
      'Thomas Jefferson',
      'James Madison',
      'Abraham Lincoln',
      'George Washington',
    ],
    answer: 'D',
  },
  {
    text: 'Who was the ancient Greek goddess of love?',
    choices: ['Aphrodite', 'Venus', 'Athena', 'Artemi'],
    answer: 'A',
  },
  {
    text: 'What ancient people worshipped cats?',
    choices: ['Egyptians', 'Mayans', 'Aztecs', 'Persia'],
    answer: 'A',
  },
  {
    text: 'How many wonders of the world are there?',
    choices: ['Six', 'Eight', 'Ten ', 'Seven'],
    answer: 'D',
  },
];

const mediumQuestions: Question[] = [
  {
    text: 'How many legs does a spider have?',
    choices: ['Eight', 'Four', 'Ten', 'Sixteen'],
    answer: 'A',
  },
  {
    text: 'How many planets are in our solar system',
    choices: ['One hundred', 'Infinite', 'Twelve', 'Eight'],
    answer: 'D',
  },
  {
    text: 'Which is the largest planet in the solar system?',
    choices: ['Sun', 'Neptune', 'Jupiter', 'Earth'],
    answer: 'C',
  },
  {
    text: 'Who has the most American Music Awards?',
    choices: ['Adele', 'Taylor Swift', 'Beyoncé', 'Drake '],
    answer: 'B',
  },
  {
    text: 'Which is the star closest to earth?',
    choices: ['Altair', 'The Sun', 'Proxima Centauri', "Barnard's Stas"],
    answer: 'B',
  },
  {
    text: 'Which blood cells fights diseases',
    choices: ['Red blood cells', 'White blood cells', 'Stem cells', 'Platelet'],
    answer: 'B',
  },
  {
    text: 'What do you call animals that eat both plants and meat?',
    choices: ['Carnivores ', 'Herbivores', 'Omnivores', 'Pescatarians'],
    answer: 'C',
  },
  {
    text: 'What sport is played in the FIFA World Cup?',
    choices: ['Basketball ', 'All Sport', 'Football', 'Soccer'],
    answer: 'D',
  },
  {
    text: 'Who painted the Mona Lisa?',
    choices: [
      'Pablo Picasso ',
      'Leonardo da Vinci ',
      'Vincent van Gog',
      'Claude Mone',
    ],
    answer: 'B',
  },
  {
    text: 'Who was the first man to step on the moon?',
    choices: [
      'Buzz Aldrin',
      'Charles “Pete” Conra',
      'Alan Bea',
      'Neil Armstrong',
    ],
    answer: 'D',
  },
];

const hardQuestions: Question[] = [
  {
    text: 'How many Earths can fit inside the sun?',
    choices: ['Three', '1.3 Million', '132', '1'],
    answer: 'B',
  },
  {
    text: 'How many teeth does an adult human have?',
    choices: ['40', '28', '2', '32'],
    answer: 'D',
  },
  {
    text: 'How much is the diameter of a basketball hoop?',
    choices: ['1 meter', '72 mm', '18 inches', '10 inc'],
    answer: 'C',
  },
  {
    text: 'How many toes does a cat have?',
    choices: ['18', '6', '8', '1'],
    answer: 'A',
  },
  {
    text: 'What is the capital of Germany?',
    choices: ['Berlin', 'Munich', 'Frankfurt', 'Colog'],
    answer: 'A',
  },
  {
    text: 'What language is spoken in Brazil?',
    choices: ['Brazilian', 'Portuguese', 'Spanish ', 'Latin'],
    answer: 'B',
  },
  {
    text: "What is Harry Potter's middle name?",
    choices: ['William', 'Charles', 'James', 'David'],
    answer: 'C',
  },
  {
    text: 'Where is the smallest human bone?',
    choices: ['Ear', 'Pinky Finger ', 'Nose', 'Elbow'],
    answer: 'A',
  },
  {
    text: 'How long does it take for food to pass through your body?',
    choices: ['1 day', '12 hours', '4 hours', '53 hours'],
    answer: 'D',
  },
  {
    text: 'How fast does the Earth spin?',
    choices: [
      '365 days',
      '1000 miles per hour',
      '1 million miles per minute',
      '67,825',
    ],
    answer: 'B',
  },
];

export const questions: Record<string, Question[]> = {
  easy: easyQuestions,
  medium: mediumQuestions,
  hard: hardQuestions,
};
