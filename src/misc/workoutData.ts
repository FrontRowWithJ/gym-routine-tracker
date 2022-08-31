export interface IWorkout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: string;
}

export type IRoutine = {
  [key in typeof muscleGroups[number]]: IWorkout[];
};

const ABS_AND_CARDIO = [
  { workoutName: "Plank", numOfSets: 2, numOfReps: 1, unit: "s" },
  {
    workoutName: "Laying Down Leg Raises",
    numOfSets: 2,
    numOfReps: 15,
    unit: "",
  },
  { workoutName: "Bicycle crunch", numOfSets: 2, numOfReps: 21, unit: "" },
  { workoutName: "Run", numOfSets: 1, numOfReps: 1, unit: "mins" },
] as const;

export const muscleGroups = [
  "chest",
  "back",
  "shoulder",
  "leg",
  "arm",
] as const;

const workout: IRoutine = {
  chest: [
    {
      workoutName: "Flat Barbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Incline Dumbbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Machine Chest Fly",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    { workoutName: "Push-up", numOfSets: 1, numOfReps: 50, unit: "" },
    ...ABS_AND_CARDIO,
  ],
  back: [
    {
      workoutName: "Seated Cable Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Seated Lat Pull Down",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    { workoutName: "Machine Row", numOfSets: 3, numOfReps: 10, unit: "kg" },
    {
      workoutName: "Bent Over Dumbell Rows, Each Arm",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
    },
    ...ABS_AND_CARDIO,
  ],
  shoulder: [
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Seated Dumbell Flys",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Seated Dumbell Front Raises",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
    },
    ...ABS_AND_CARDIO,
  ],
  leg: [
    {
      workoutName: "Leg Press Machine",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Hamstring Leg Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Quad Leg Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    {
      workoutName: "Body Weight squat jumps",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
    },
    ...ABS_AND_CARDIO,
  ],
  arm: [
    { workoutName: "Dumbell Curls", numOfSets: 3, numOfReps: 10, unit: "kg" },
    {
      workoutName: "Dumbell Skull Crushers",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    { workoutName: "Rope Cable Curl", numOfSets: 3, numOfReps: 10, unit: "kg" },
    {
      workoutName: "Rope Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    { workoutName: "Preacher Curl", numOfSets: 3, numOfReps: 10, unit: "kg" },
    {
      workoutName: "Bent Over Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
    },
    ...ABS_AND_CARDIO,
  ],
};

export default workout;
