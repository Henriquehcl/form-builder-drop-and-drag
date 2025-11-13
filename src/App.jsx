//src/App.jsx
import React from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar/Sidebar';
import FormBuilder from './components/FormBuilder/FormBuilder';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import { FormBuilderProvider } from './hooks/useFormBuilder';

/**
 * Componente principal da aplicação
 * Organiza o layout em três colunas: Sidebar, FormBuilder e PropertiesPanel
 */
function App() {
  return (
    <FormBuilderProvider>
      <div className="app">
        {/* Sidebar esquerda com elementos do formulário */}
        <div className="app-sidebar">
          <Sidebar />
        </div>
        
        {/* Área central de construção do formulário */}
        <div className="app-builder">
          <FormBuilder />
        </div>
        
        {/* Painel direito de propriedades */}
        <div className="app-properties">
          <PropertiesPanel />
        </div>
      </div>
    </FormBuilderProvider>
  );
}

export default App;