export interface IWorkout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: string;
  videoURL?: string;
}

export type IRoutine = {
  [key in typeof muscleGroups[number]]: readonly IWorkout[];
};

export const ABS_AND_CARDIO: readonly IWorkout[] = [
  { workoutName: "Plank", numOfSets: 2, numOfReps: 1, unit: "s" },
  {
    workoutName: "Laying Down Leg Raises",
    numOfSets: 2,
    numOfReps: 15,
    unit: "",
    videoURL: "https://www.youtube.com/embed/JB2oyawG9KI",
  },
  {
    workoutName: "Bicycle crunch",
    numOfSets: 2,
    numOfReps: 21,
    unit: "",
    videoURL: "https://www.youtube.com/embed/9FGilxCbdz8",
  },
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
      videoURL: "https://www.youtube.com/embed/rT7DgCr-3pg",
    },
    {
      workoutName: "Incline Dumbbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8iPEnn-ltC8",
    },
    {
      workoutName: "Machine Chest Fly",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Z57CtFmRMxA",
    },
    { workoutName: "Push-up", numOfSets: 1, numOfReps: 50, unit: "" },
  ],
  back: [
    {
      workoutName: "Seated Cable Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/GZbfZ033f74",
    },
    {
      workoutName: "Seated Lat Pull Down",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/JEb-dwU3VF4",
    },
    {
      workoutName: "Machine Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8MKGArS7w7c",
    },
    {
      workoutName: "Bent Over Dumbell Rows, Each Arm",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/pYcpY20QaE8",
    },
  ],
  shoulder: [
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/qEwKCR5JCog",
    },
    {
      workoutName: "Seated Dumbell Flys",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/3VcKaXpzqRo",
    },
    {
      workoutName: "Seated Dumbell Front Raises",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/-t7fuZ0KhDA",
    },
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/qEwKCR5JCog",
    },
  ],
  leg: [
    {
      workoutName: "Leg Press Machine",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/IZxyjW7MPJQ",
    },
    {
      workoutName: "Hamstring Leg Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/1Tq3QdYUuHs",
    },
    {
      workoutName: "Quad Leg Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/YyvSfVjQeL0",
    },
    {
      workoutName: "Body Weight squat jumps",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/DeTBwEL4m7s",
    },
  ],
  arm: [
    {
      workoutName: "Dumbell Curls",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/sAq_ocpRh_I",
    },
    {
      workoutName: "Dumbell Skull Crushers",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/ir5PsbniVSc",
    },
    {
      workoutName: "Rope Cable Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Odz1T8WmDBI",
    },
    {
      workoutName: "Rope Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/kiuVA0gs3EI",
    },
    {
      workoutName: "Preacher Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Po_HF7Yz0nI",
    },
    {
      workoutName: "Bent Over Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/rqefaPkIPqc",
    },
  ],
} as const;

export default workout;
