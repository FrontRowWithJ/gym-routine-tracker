import { Link as L, Route as R } from "react-router-dom";

type functionType = (...args: any) => any;
type LinkRouteType<
  TComponent extends functionType,
  TProp extends "path" | "to"
> = <TPropType extends string>(
  props: Parameters<TComponent>[0] & { [Prop in TProp]: TPropType }
) => ReturnType<TComponent>;

export const Route: LinkRouteType<typeof R, "path"> = R;
export const Link: LinkRouteType<typeof L, "to"> = L;

