import { questions } from './questions';
import {
  GameState,
  GameDifficulty,
  Menu,
  Round,
  QuestionStatus,
  MenuScreen,
  Winner,
} from './types';

export type GameStatus = 'pre-game' | 'in-game' | 'post-game';

export const ArduinoStates = {
  GameStatus: ['pre-game', 'in-game', 'post-game'] as GameStatus[],
  QuestionStatus: [
    'pre-question',
    'live-question',
    'post-question',
  ] as QuestionStatus[],
  MenuScreen: [
    'splash-screen',
    'difficulty-screen',
    'start-screen',
  ] as MenuScreen[],
  GameDifficulty: ['not-set', 'easy', 'medium', 'hard'] as GameDifficulty[],
  Winner: ['no-winner', 'player-1', 'player-2', 'tie'] as Winner[],
};

export type ArduinoMessagePacket = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export interface ArduinoState {
  gameStatus: GameStatus;
  questionStatus: QuestionStatus;
  questionIndex: number;
  player1LapCount: number;
  player2LapCount: number;
  player1Answer: number;
  player2Answer: number;
  menuScreen: MenuScreen;
  difficultyMenuOption: number;
  startMenuOption: number;
  endMenuOption: number;
  winner: number;
  answerRequest: number;
}

export function parseArduinoStateFromMesageString(
  messageString: string,
): ArduinoState {
  const packet = messageString.split(',').map((ch) => +ch);

  const [
    gameStatus,
    questionStatus,
    questionIndex,
    player1LapCount,
    player2LapCount,
    player1Answer,
    player2Answer,
    menuScreen,
    difficultyMenuOption,
    startMenuOption,
    endMenuOption,
    winner,
    answerRequest,
  ] = packet;

  return {
    gameStatus: ArduinoStates.GameStatus[gameStatus],
    questionStatus: ArduinoStates.QuestionStatus[questionStatus],
    questionIndex,
    player1LapCount,
    player2LapCount,
    player1Answer,
    player2Answer,
    menuScreen: ArduinoStates.MenuScreen[menuScreen],
    difficultyMenuOption,
    startMenuOption,
    endMenuOption,
    winner,
    answerRequest,
  };
}

export function mapArduinoStateToGameState(
  {
    gameStatus,
    questionStatus,
    questionIndex,
    player1LapCount,
    player2LapCount,
    player1Answer,
    player2Answer,
    menuScreen,
    difficultyMenuOption,
    startMenuOption,
    endMenuOption,
    winner,
    answerRequest,
  }: ArduinoState,
  game: GameState,
): GameState {
  const difficulty = ArduinoStates.GameDifficulty[difficultyMenuOption];
  const _questionIndex =
    difficulty !== 'not-set' ? questionIndex % questions[difficulty].length : 0;

  const currentRound: Round = {
    status: questionStatus,
    questionIndex: difficulty !== 'not-set' ? _questionIndex : -1,
    question:
      difficulty !== 'not-set' ? questions[difficulty][_questionIndex] : null,
    p1Answer:
      player1Answer === 0
        ? undefined
        : String.fromCharCode(65 + player1Answer - 1) ||
          game.currentRound.p1Answer,
    p2Answer:
      player2Answer === 0
        ? undefined
        : String.fromCharCode(65 + player2Answer - 1) ||
          game.currentRound.p2Answer,
  };
  const menu: Menu = {
    options: ['Easy', 'Medium', 'Hard'],
    selectedIndex: difficultyMenuOption,
  };

  return {
    state: gameStatus,
    menuScreen,
    lapCounts: {
      player1: player1LapCount,
      player2: player2LapCount,
    },
    difficulty,
    currentRound,
    menu,
    winner: ArduinoStates.Winner[winner],
    startMenuOption,
    endMenuOption,
    answerRequest,
  };
}
