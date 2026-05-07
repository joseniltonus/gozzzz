import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CoachContent } from './index';

export default function ConciergeStackScreen() {
  return (
    <ErrorBoundary>
      <CoachContent showBack />
    </ErrorBoundary>
  );
}
