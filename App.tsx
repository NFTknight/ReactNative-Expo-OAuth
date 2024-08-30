import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import RootLayout from 'src/navigation/RootLayout';

export default function App() {

  return (
    <ErrorBoundary onError={(err) => { console.log('ErrorBoundary: ', err) }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar
          backgroundColor="#F7F1FE"
          style='light'
        />
        <RootLayout />
      </SafeAreaView>
    </ErrorBoundary>
  );
}
