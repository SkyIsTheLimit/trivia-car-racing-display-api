export type GameStatus = 'pre-game' | 'in-game' | 'post-game';
export type QuestionStatus = 'pre-question' | 'live-question' | 'post-question';
export type GameDifficulty = 'easy' | 'medium' | 'hard';
export type MenuScreen = 'splash-screen' | 'difficulty-screen' | 'start-screen';
export interface Question {
  text: string;
  choices: [string, string, string, string];
  answer: string;
}
export type Winner = 'no-winner' | 'player-1' | 'player-2' | 'tie';

export interface Round {
  status: QuestionStatus;
  questionIndex: number;
  question: Question;
  p1Answer?: string;
  p2Answer?: string;
}

export interface Menu {
  options: string[];
  selectedIndex: number;
}

export interface GameState {
  state: GameStatus;
  menuScreen: MenuScreen;
  lapCounts: {
    player1: number;
    player2: number;
  };
  difficulty: GameDifficulty;
  currentRound?: Round;
  menu: Menu;
  winner: Winner;
}
