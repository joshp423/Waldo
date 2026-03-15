interface Entry {
  id: number;
  time: number;
  username: string;
  title: string;
  game: Game;
}

interface Game {
  id: number;
  title: string;
}

export type { Entry };
