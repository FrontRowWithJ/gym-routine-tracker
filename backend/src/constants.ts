import { ObjectId } from "mongodb";
import { Routines } from "./types";

const ROUTINE_DOCUMENT_ID = "644ef1a4eb1251c80ab73c4d";

export const ROUTINE_DB_NAME = "routine_db";
export const ROUTINE_COLLECTION_NAME = "routine_info";
export const CREDENTIALS_DB_NAME = "credentials_db";
export const CREDENTIALS_COLLECTION_NAME = "credentials_collection";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://gym-routine-tracker.netlify.app",
  "Access-Control-Allow-Credentials": "true",
} as const;

export const JSON_HEADER = {
  "Content-Type": "application/json",
  ...CORS_HEADERS,
} as const;

export const TEXT_PLAIN_HEADER = {
  "Content-Type": "text/plain",
  ...CORS_HEADERS,
} as const;

export const OPTIONS_HEADER = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export const OPTIONS_RESPONSE = {
  statusCode: 200,
  body: "OK",
  headers: { ...TEXT_PLAIN_HEADER, ...OPTIONS_HEADER },
};

export const ROUTINE_DOCUMENT_QUERY = {
  _id: new ObjectId(ROUTINE_DOCUMENT_ID),
};

export const ROUTINES: Routines = {
  leg: [],
  arm: [],
  shoulder: [],
  cardio: [],
  abs: [],
  back: [],
  chest: [],
};

export const ROUTINE: Routines = {
  chest: [
    {
      workoutName: "Flat Barbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/rT7DgCr-3pg",
      unitAmount: 2.5,
      amount: 40,
    },
    {
      workoutName: "Incline Dumbbell Bench Press",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8iPEnn-ltC8",
      unitAmount: 2.5,
      amount: 12.5,
    },
    {
      workoutName: "Machine Chest Fly",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Z57CtFmRMxA",
      unitAmount: 2.5,
      amount: 32.5,
    },
    {
      workoutName: "Push-up",
      numOfSets: 1,
      numOfReps: 50,
      unit: "",
      unitAmount: 2.5,
      amount: 20,
      videoURL: "",
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
      amount: 60,
    },
    {
      workoutName: "Seated Lat Pull Down",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/JEb-dwU3VF4",
      unitAmount: 2.5,
      amount: 55,
    },
    {
      workoutName: "Machine Row",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/8MKGArS7w7c",
      unitAmount: 2.5,
      amount: 25,
    },
    {
      workoutName: "Bent Over Dumbell Rows, Each Arm",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/pYcpY20QaE8",
      unitAmount: 2.5,
      amount: 10,
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
      amount: 10,
    },
    {
      workoutName: "Seated Dumbell Flys",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/3VcKaXpzqRo",
      unitAmount: 2.5,
      amount: 5,
    },
    {
      workoutName: "Seated Dumbell Front Raises",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/-t7fuZ0KhDA",
      unitAmount: 2.5,
      amount: 0,
    },
    {
      workoutName: "Seated Dumbell Military Press",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/qEwKCR5JCog",
      unitAmount: 2.5,
      amount: 10,
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
      amount: 110,
    },
    {
      workoutName: "Hamstring Leg Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/1Tq3QdYUuHs",
      unitAmount: 2.5,
      amount: 32.5,
    },
    {
      workoutName: "Quad Leg Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/YyvSfVjQeL0",
      unitAmount: 2.5,
      amount: 107.5,
    },
    {
      workoutName: "Body Weight squat jumps",
      numOfSets: 1,
      numOfReps: 50,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/DeTBwEL4m7s",
      unitAmount: 2.5,
      amount: 0,
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
      amount: 15,
    },
    {
      workoutName: "Dumbell Skull Crushers",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/ir5PsbniVSc",
      unitAmount: 2.5,
      amount: 7.5,
    },
    {
      workoutName: "Rope Cable Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Odz1T8WmDBI",
      unitAmount: 2.5,
      amount: 40,
    },
    {
      workoutName: "Rope Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/kiuVA0gs3EI",
      unitAmount: 2.5,
      amount: 40,
    },
    {
      workoutName: "Preacher Curl",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/Po_HF7Yz0nI",
      unitAmount: 2.5,
      amount: 0,
    },
    {
      workoutName: "Bent Over Arm Extension",
      numOfSets: 3,
      numOfReps: 10,
      unit: "kg",
      videoURL: "https://www.youtube.com/embed/rqefaPkIPqc",
      unitAmount: 2.5,
      amount: 12.5,
    },
  ],
  cardio: [
    {
      workoutName: "Run",
      numOfSets: 1,
      numOfReps: 1,
      unit: "mins",
      unitAmount: 5,
      amount: 15,
      videoURL: "",
    },
  ],
  abs: [
    {
      workoutName: "Plank",
      numOfSets: 2,
      numOfReps: 1,
      unit: "s",
      unitAmount: 5,
      amount: 50,
      videoURL: "",
    },
    {
      workoutName: "Laying Down Leg Raises",
      numOfSets: 2,
      numOfReps: 15,
      unit: "",
      videoURL: "https://www.youtube.com/embed/JB2oyawG9KI",
      unitAmount: 5,
      amount: 0,
    },
    {
      workoutName: "Bicycle crunch",
      numOfSets: 2,
      numOfReps: 21,
      unit: "",
      videoURL: "https://www.youtube.com/embed/9FGilxCbdz8",
      unitAmount: 1,
      amount: 0,
    },
  ],
};
