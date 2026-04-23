export interface Task {
  id: string;
  text: string;
  category: "house" | "work" | "personal" | string;
  done: boolean;
}