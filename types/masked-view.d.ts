declare module '@react-native-masked-view/masked-view' {
  import type { ComponentType, ReactNode } from 'react';
  import type { StyleProp, ViewStyle } from 'react-native';

  export interface MaskedViewProps {
    maskElement: ReactNode;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
  }

  const MaskedView: ComponentType<MaskedViewProps>;
  export default MaskedView;
}
