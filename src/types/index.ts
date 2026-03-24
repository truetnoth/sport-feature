export type Goal = 'strength' | 'flexibility' | 'coordination' | 'endurance';
export type Equipment = 'none' | 'dumbbells' | 'barbell' | 'kettlebell' | 'machines' | 'fitball' | 'chair' | 'pullup_bar' | 'trx' | 'resistance_bands';
export type BodyPart = 'chest' | 'shoulders' | 'arms' | 'back' | 'abs' | 'glutes' | 'legs';
export type BodyArea = 'biceps' | 'triceps' | 'lats' | 'trapezius' | 'spine_extensors' | 'rectus_abdominis' | 'obliques' | 'quadriceps' | 'hamstrings' | 'calves' | 'gluteus_med' | 'gluteus_max';
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
