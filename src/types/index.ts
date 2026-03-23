export type Goal = 'strength' | 'flexibility' | 'coordination' | 'endurance' | 'health' | 'yoga';
export type Equipment = 'none' | 'dumbbells' | 'barbell' | 'kettlebell' | 'machines' | 'fitball' | 'chair' | 'pullup_bar' | 'trx' | 'resistance_bands';
export type BodyPart = 'chest' | 'shoulders' | 'biceps' | 'triceps' | 'back' | 'abs' | 'glutes' | 'legs';
export type BodyArea = 'spine' | 'lower_body' | 'upper_body';
export type Special = 'pregnant' | 'elderly' | 'herniated_disc' | 'knee_problems' | 'hip_problems' | 'posture' | 'foot_health' | 'office_warmup';
export type Location = 'home' | 'gym' | 'outdoor' | 'office';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ExerciseTags {
  goal: Goal[];
  equipment: Equipment[];
  bodyPart: BodyPart[];
  bodyArea: BodyArea[];
  location: Location[];
  difficulty: Difficulty;
  special: Special[];
}

export interface Exercise {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  steps: string[];
  image: string;
  gif: string;
  sourceArticleUrl: string;
  sourceArticleTitle: string;
  tags: ExerciseTags;
}

export interface Playlist {
  id: string;
  title: string;
  exerciseIds: string[];
  createdAt: string;
}

export interface FilterState {
  goal: Goal[];
  equipment: Equipment[];
  bodyPart: BodyPart[];
  bodyArea: BodyArea[];
  location: Location[];
  difficulty: Difficulty[];
  special: Special[];
  search: string;
}
