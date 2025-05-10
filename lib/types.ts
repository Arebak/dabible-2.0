// types/next.ts
export type RouteHandlerContext<TParams extends Record<string, string> = Record<string, never>> = {
  params: TParams;
};