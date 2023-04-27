import { Routine } from "../../../misc";

export interface RoutineProps {
  routine: Routine;
  canShow: boolean[];
  enable: (i: number) => void;
  disable: () => void;
  setRoutine: React.Dispatch<React.SetStateAction<Routine>>;
}
