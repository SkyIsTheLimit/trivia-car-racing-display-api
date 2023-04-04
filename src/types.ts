export type GameState = 'not-started' | 'waiting-1' | 'waiting-2' | 'finished';

export interface Question {
  text: string;
  choices: [string, string, string, string];
  answer: string;
}

export interface Round {
  id: number;
  question: Question;
  p1Answer?: string;
  p2Answer?: string;
}

export interface Menu {
  title: string;
  options: string[];
  highlighted: number;
}

export interface Game {
  state: GameState;
  difficulty: 'easy' | 'medium' | 'hard';
  rounds: Round[];
  currentRound?: Round;
  questionNo: number;
  menu: Menu;
}
