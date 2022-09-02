export interface IWorkout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: string;
  unitAmount: number;
  videoURL?: string;
}

export type IRoutine = {
  [key in typeof muscleGroups[number]]: readonly IWorkout[];
};

export const ABS_AND_CARDIO: readonly IWorkout[] = [
  {
    workoutName: "Plank",
    numOfSets: 2,
    numOfReps: 1,
    unit: "s",
    unitAmount: 5,
  },
  {
    workoutName: "Laying Down Leg Raises",
    numOfSets: 2,
    numOfReps: 15,
    unit: "",
    videoURL: "https://www.youtube.com/embed/JB2oyawG9KI",
    unitAmount: 5,
  },
  {
    workoutName: "Bicycle crunch",
    numOfSets: 2,
    numOfReps: 21,
    unit: "",
    videoURL: "https://www.youtube.com/embed/9FGilxCbdz8",
    unitAmount: 1,
  },
  {
    workoutName: "Run",
    numOfSets: 1,
    numOfReps: 1,
    unit: "mins",
    unitAmount: 5,
  },
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
      unitAmount: 2.5,
    },
    {
      workoutName: "Incline Dumbbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8iPEnn-ltC8",
      unitAmount: 2.5,
    },
    {
      workoutName: "Machine Chest Fly",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Z57CtFmRMxA",
      unitAmount: 2.5,
    },
    {
      workoutName: "Push-up",
      numOfSets: 1,
      numOfReps: 50,
      unit: "",
      unitAmount: 2.5,
    },
  ],
  back: [
    {
      workoutName: "Seated Cable Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/GZbfZ033f74",
      unitAmount: 2.5,
    },
    {
      workoutName: "Seated Lat Pull Down",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/JEb-dwU3VF4",
      unitAmount: 2.5,
    },
    {
      workoutName: "Machine Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8MKGArS7w7c",
      unitAmount: 2.5,
    },
    {
      workoutName: "Bent Over Dumbell Rows, Each Arm",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/pYcpY20QaE8",
      unitAmount: 2.5,
    },
  ],
  shoulder: [
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/qEwKCR5JCog",
      unitAmount: 2.5,
    },
    {
      workoutName: "Seated Dumbell Flys",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/3VcKaXpzqRo",
      unitAmount: 2.5,
    },
    {
      workoutName: "Seated Dumbell Front Raises",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/-t7fuZ0KhDA",
      unitAmount: 2.5,
    },
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/qEwKCR5JCog",
      unitAmount: 2.5,
    },
  ],
  leg: [
    {
      workoutName: "Leg Press Machine",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/IZxyjW7MPJQ",
      unitAmount: 2.5,
    },
    {
      workoutName: "Hamstring Leg Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/1Tq3QdYUuHs",
      unitAmount: 2.5,
    },
    {
      workoutName: "Quad Leg Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/YyvSfVjQeL0",
      unitAmount: 2.5,
    },
    {
      workoutName: "Body Weight squat jumps",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/DeTBwEL4m7s",
      unitAmount: 2.5,
    },
  ],
  arm: [
    {
      workoutName: "Dumbell Curls",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/sAq_ocpRh_I",
      unitAmount: 2.5,
    },
    {
      workoutName: "Dumbell Skull Crushers",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/ir5PsbniVSc",
      unitAmount: 2.5,
    },
    {
      workoutName: "Rope Cable Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Odz1T8WmDBI",
      unitAmount: 2.5,
    },
    {
      workoutName: "Rope Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/kiuVA0gs3EI",
      unitAmount: 2.5,
    },
    {
      workoutName: "Preacher Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Po_HF7Yz0nI",
      unitAmount: 2.5,
    },
    {
      workoutName: "Bent Over Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/rqefaPkIPqc",
      unitAmount: 2.5,
    },
  ],
} as const;

export default workout;
