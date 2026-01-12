import React from 'react';
import '../../styles/PropertiesPanel.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

/**
 * Painel de propriedades para editar elementos selecionados
 * Mostra diferentes opções baseadas no tipo de elemento
 */
const PropertiesPanel = () => {
  const { selectedElement, updateElementProperties, removeElement, layoutMode, toggleElementWidth } = useFormBuilder();

  /**
   * Atualiza uma propriedade do elemento
   */
  const handlePropertyChange = (property, value) => {
    if (selectedElement) {
      updateElementProperties(selectedElement.id, { [property]: value });
    }
  };

  /**
   * Remove o elemento selecionado
   */
  const handleDeleteElement = () => {
    if (selectedElement) {
      removeElement(selectedElement.id);
    }
  };

  /**
   * Alterna a largura do elemento
   */
  const handleToggleWidth = () => {
    if (selectedElement) {
      toggleElementWidth(selectedElement.id);
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

  // Verifica se o elemento pode ter largura alternada
  const canToggleWidth = !['workflow-step', 'textarea', 'container-heading', 'container-subheading'].includes(selectedElement.type);

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

          {/* Controle de largura - só aparece no modo grid e para elementos que suportam */}
          {layoutMode === 'grid' && canToggleWidth && (
            <div className="property-field">
              <label>Width</label>
              <div className="width-toggle">
                <button 
                  className={`width-btn ${selectedElement.width === 'half' ? 'active' : ''}`}
                  onClick={handleToggleWidth}
                >
                  Half Width
                </button>
                <button 
                  className={`width-btn ${selectedElement.width === 'full' ? 'active' : ''}`}
                  onClick={handleToggleWidth}
                >
                  Full Width
                </button>
              </div>
              <small>Current: {selectedElement.width === 'full' ? 'Full width (100%)' : 'Half width (50%)'}</small>
            </div>
          )}
        </div>

        {/* ... resto do código mantido igual ... */}

      </div>
    </div>
  );
};

export default PropertiesPanel;