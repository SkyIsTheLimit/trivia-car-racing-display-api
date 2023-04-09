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
  GameDifficulty: ['easy', 'easy', 'medium', 'hard'] as GameDifficulty[],
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
}

export function parseArduinoStateFromMesageString(
  messageString: string,
): ArduinoState {
  const packet = messageString
    .substring(1, messageString.length - 1)
    .split(',')
    .map((ch) => +ch);

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
  };
}

export function mapArduinoStateToGameState(
  arduinoState: ArduinoState,
  game: GameState,
): GameState {
  const difficulty =
    ArduinoStates.GameDifficulty[arduinoState.difficultyMenuOption];

  const currentRound: Round = {
    status: arduinoState.questionStatus,
    questionIndex: arduinoState.questionIndex,
    question: questions[difficulty][arduinoState.questionIndex],
    p1Answer:
      arduinoState.player1Answer === 0
        ? undefined
        : String.fromCharCode(65 + arduinoState.player1Answer - 1) ||
          game.currentRound.p1Answer,
    p2Answer:
      arduinoState.player2Answer === 0
        ? undefined
        : String.fromCharCode(65 + arduinoState.player2Answer - 1) ||
          game.currentRound.p2Answer,
  };
  const menu: Menu = {
    options: ['Easy', 'Medium', 'Hard'],
    selectedIndex: arduinoState.difficultyMenuOption,
  };

  return {
    state: arduinoState.gameStatus,
    menuScreen: arduinoState.menuScreen,
    lapCounts: {
      player1: arduinoState.player1LapCount,
      player2: arduinoState.player2LapCount,
    },
    difficulty,
    currentRound,
    menu,
    winner: ArduinoStates.Winner[arduinoState.winner],
  };
}
