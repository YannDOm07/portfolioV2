import { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class GlobalErrorBoundary extends Component<{children: ReactNode}, {error: Error | null}> {
  state: {error: Error | null} = { error: null };
  static getDerivedStateFromError(error: any) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', background: '#450a0a', color: '#fecaca', fontFamily: 'monospace', minHeight: '100vh', zIndex: 99999, position: 'relative' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>Erreur Raportee (Merci de me la copier) :</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#000', padding: '1rem', borderRadius: '8px' }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', fontSize: '12px' }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>
);
