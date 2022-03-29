import MatchModel from '../models/MatchModel';

export default interface NewMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface MatchClub extends MatchModel {
  homeClub?: {
    clubName: string,
  }
}
