import { healthProblem } from "./HealthProblem";

export interface Client {
  name: string;
  dob: Date;
  sex: string;
  healthProblem: healthProblem[];
  createdAt: Date;
  updatedAt: Date;
}
