
export enum StudyMode {
  SUMMARY = 'Summary',
  KEY_POINTS = 'Key Points',
  FLASHCARDS = 'Flashcards',
  QA = 'Q&A',
  QUIZ = 'Quiz',
  SIMPLIFIED = 'Simplified Explanation'
}

export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
}

export interface StudyResult {
  mode: StudyMode;
  content: string;
  timestamp: number;
}
