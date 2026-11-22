export type AppWindow = {
  id: string;
  title: string;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
    };
};