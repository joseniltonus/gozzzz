import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'An unexpected error occurred';
      const stackTrace = this.state.errorInfo?.componentStack || '';

      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.errorBox}>
              <Text style={styles.title}>Something Went Wrong</Text>
              <Text style={styles.errorLabel}>Error Details:</Text>
              <View style={styles.messageBox}>
                <Text style={styles.message}>{errorMessage}</Text>
              </View>
              {stackTrace && (
                <>
                  <Text style={styles.errorLabel}>Component Stack:</Text>
                  <View style={styles.stackBox}>
                    <Text style={styles.stackTrace}>{stackTrace}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                <Text style={styles.buttonText}>Reload App</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  errorBox: {
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fca5a5',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  message: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  stackBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    maxHeight: 200,
  },
  stackTrace: {
    fontSize: 11,
    color: '#94a3b8',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
