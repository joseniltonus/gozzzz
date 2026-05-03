declare module 'react-native-view-shot' {
  import type { RefObject } from 'react';
  import type { View } from 'react-native';

  export function captureRef(
    viewRef: RefObject<View | null>,
    options?: {
      format?: 'png' | 'jpg' | 'webm' | 'raw';
      quality?: number;
      width?: number;
      height?: number;
      result?: 'tmpfile' | 'base64' | 'data-uri' | 'zip';
      [key: string]: unknown;
    },
  ): Promise<string>;
}

declare module 'expo-sharing' {
  export function isAvailableAsync(): Promise<boolean>;
  export function shareAsync(
    url: string,
    options?: {
      mimeType?: string;
      dialogTitle?: string;
      UTI?: string;
      [key: string]: unknown;
    },
  ): Promise<void>;
}
