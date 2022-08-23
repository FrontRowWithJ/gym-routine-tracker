const ABS = [
  { workoutName: "25s Plank", numOfSets: 2, numOfReps: 1 },
  { workoutName: "Laying Down Leg Raises", numOfSets: 2, numOfReps: 15 },
  { workoutName: "Bicycle crunch", numOfSets: 2, numOfReps: 21 },
];

export interface IWorkout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
}

export const muscleGroups = [
  "chest",
  "back",
  "shoulder",
  "leg",
  "arms",
] as const;
export type IRoutine = {
  [key in typeof muscleGroups[number]]: IWorkout[];
};

const workout: IRoutine = {
  chest: [
    { workoutName: "Flat Barbell Bench Press", numOfSets: 3, numOfReps: 10 },
    {
      workoutName: "Incline Dumbbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
    },
    { workoutName: "Machine Chest Fly", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Push-up", numOfSets: 1, numOfReps: 50 },
    ...ABS,
    { workoutName: "15 min run", numOfSets: 1, numOfReps: 1 },
  ],
  back: [
    { workoutName: "Seated Cable Row", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Seated Lat Pull Down", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Machine Row", numOfSets: 3, numOfReps: 10 },
    {
      workoutName: "Bent Over Dumbell Rows, Each Arm",
      numOfSets: 1,
      numOfReps: 50,
    },
    ...ABS,
    { workoutName: "15 min run", numOfSets: 1, numOfReps: 1 },
  ],
  shoulder: [
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 3,
      numOfReps: 10,
    },
    { workoutName: "Seated Dumbell Flys", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Seated Dumbell Front Raises", numOfSets: 3, numOfReps: 10 },
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 1,
      numOfReps: 50,
    },
    ...ABS,
    { workoutName: "15 min run", numOfSets: 1, numOfReps: 1 },
  ],
  leg: [
    { workoutName: "Leg Press Machine", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Hamstring Leg Curl", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Quad Leg Extension", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Body Weight squat jumps", numOfSets: 1, numOfReps: 50 },
    ...ABS,
    { workoutName: "15 min run", numOfSets: 1, numOfReps: 1 },
  ],
  arms: [
    { workoutName: "Dumbell Curls", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Dumbell Skull Crushers", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Rope Cable Curl", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Rope Arm Extension", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Preacher Curl", numOfSets: 3, numOfReps: 10 },
    { workoutName: "Bent Over Arm Extension", numOfSets: 3, numOfReps: 10 },
    ...ABS,
    { workoutName: "15 min run", numOfSets: 1, numOfReps: 1 },
  ],
};

export default workout;
