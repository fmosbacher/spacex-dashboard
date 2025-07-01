/// <reference types="vite/client" />

interface Window {
  gtag: (
    command: "event",
    eventName: string,
    eventParameters: {
      experiment_id: string;
      variation_id: string | number;
      [key: string]: any;
    }
  ) => void;
}
