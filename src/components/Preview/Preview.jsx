import React from 'react';
import '../../styles/Preview.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

/**
 * Componente de preview do formulário
 * Mostra como o formulário ficará para os usuários finais
 */
const Preview = () => {
  const { formElements, togglePreviewMode, layoutMode } = useFormBuilder();

  /**
   * Renderiza um elemento do formulário no modo preview
   */
  const renderFormElement = (element) => {
    const isFullWidth = element.width === 'full' || layoutMode === 'vertical';
    
    switch (element.type) {
      case 'text-field':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : 'half-width'}`} key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              required={element.required}
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="preview-field full-width" key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              required={element.required}
              rows="3"
            />
          </div>
        );
      
      // ... mantém os outros cases iguais ...
    }
  };

  // Organiza elementos em linhas no preview também
  const renderPreviewContent = () => {
    if (layoutMode === 'vertical') {
      return formElements.map((element) => (
        <div key={element.id} className="preview-row">
          {renderFormElement(element)}
        </div>
      ));
    }

    // Modo grid - similar ao builder
    const rows = [];
    let currentRow = [];
    let currentRowItems = 0;

    formElements.forEach((element) => {
      const isFullWidth = element.width === 'full';
      
      if (isFullWidth || currentRowItems === 2) {
        if (currentRow.length > 0) {
          rows.push(
            <div key={`row-${rows.length}`} className="preview-row">
              {currentRow}
            </div>
          );
        }
        currentRow = [renderFormElement(element)];
        currentRowItems = isFullWidth ? 2 : 1;
      } else if (currentRowItems < 2) {
        currentRow.push(renderFormElement(element));
        currentRowItems += 1;
      }
    });
    
    if (currentRow.length > 0) {
      rows.push(
        <div key={`row-${rows.length}`} className="preview-row">
          {currentRow}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="preview">
      {/* ... mantém o resto do preview igual ... */}
    </div>
  );
};

export default Preview;