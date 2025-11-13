//src/components/PropertiesPanel/PropertiesPanel.jsx

import React from 'react';
import '../../styles/PropertiesPanel.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

/**
 * Painel de propriedades para editar elementos selecionados
 * Mostra diferentes opções baseadas no tipo de elemento
 */
const PropertiesPanel = () => {
  const { selectedElement, updateElementProperties } = useFormBuilder();

  /**
   * Atualiza uma propriedade do elemento
   */
  const handlePropertyChange = (property, value) => {
    if (selectedElement) {
      updateElementProperties(selectedElement.id, { [property]: value });
    }
  };

  // Se nenhum elemento estiver selecionado, mostra mensagem
  if (!selectedElement) {
    return (
      <div className="properties-panel">
        <div className="properties-header">
          <h3>Edit Properties</h3>
        </div>
        <div className="properties-content">
          <div className="no-selection">
            <p>Note: You need to select a container/control to edit properties.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <h3>Edit Properties</h3>
        <div className="element-type-badge">
          {selectedElement.type}
        </div>
      </div>

      <div className="properties-content">
        {/* Propriedades básicas comuns a todos os elementos */}
        <div className="property-group">
          <h4>Basic Properties</h4>
          
          <div className="property-field">
            <label>Label</label>
            <input
              type="text"
              value={selectedElement.label || ''}
              onChange={(e) => handlePropertyChange('label', e.target.value)}
              placeholder="Enter field label"
            />
          </div>

          <div className="property-field">
            <label>Placeholder</label>
            <input
              type="text"
              value={selectedElement.placeholder || ''}
              onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
              placeholder="Enter placeholder text"
            />
          </div>

          <div className="property-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={selectedElement.required || false}
                onChange={(e) => handlePropertyChange('required', e.target.checked)}
              />
              Required Field
            </label>
          </div>
        </div>

        {/* Propriedades específicas baseadas no tipo de elemento */}
        {selectedElement.type === 'dropdown' && (
          <div className="property-group">
            <h4>Dropdown Options</h4>
            <div className="property-field">
              <label>Options (one per line)</label>
              <textarea
                value={selectedElement.options?.join('\n') || ''}
                onChange={(e) => handlePropertyChange('options', e.target.value.split('\n'))}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows="4"
              />
            </div>
          </div>
        )}

        {selectedElement.type === 'radio' && (
          <div className="property-group">
            <h4>Radio Options</h4>
            <div className="property-field">
              <label>Options (one per line)</label>
              <textarea
                value={selectedElement.options?.join('\n') || ''}
                onChange={(e) => handlePropertyChange('options', e.target.value.split('\n'))}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows="4"
              />
            </div>
          </div>
        )}

        {selectedElement.type === 'workflow-step' && (
          <div className="property-group">
            <h4>Workflow Step</h4>
            <div className="property-field">
              <label>Step Title</label>
              <input
                type="text"
                value={selectedElement.label || ''}
                onChange={(e) => handlePropertyChange('label', e.target.value)}
                placeholder="Enter step title"
              />
            </div>
          </div>
        )}

        {/* Ações do elemento */}
        <div className="property-group">
          <h4>Actions</h4>
          <div className="property-actions">
            <button className="btn btn-danger">Delete Element</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;