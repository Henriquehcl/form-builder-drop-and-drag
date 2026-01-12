import React from 'react';
import '../../styles/Preview.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

/**
 * Componente de preview do formulário
 * Mostra como o formulário ficará para os usuários finais
 */
const Preview = () => {
  const { formElements, togglePreviewMode } = useFormBuilder();

  /**
   * Verifica se um elemento deve ocupar linha inteira no preview
   */
  const shouldTakeFullWidth = (element) => {
    const fullWidthElements = [
      'workflow-step', 
      'textarea', 
      'container-heading',
      'container-subheading'
    ];
    return fullWidthElements.includes(element.type);
  };

  /**
   * Renderiza um elemento do formulário no modo preview
   */
  const renderFormElement = (element) => {
    const isFullWidth = shouldTakeFullWidth(element);
    
    switch (element.type) {
      case 'text-field':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
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
      
      case 'date-picker':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <input
              type="date"
              required={element.required}
            />
          </div>
        );
      
      case 'time':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <input
              type="time"
              required={element.required}
            />
          </div>
        );
      
      case 'checkbox':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
            <label className="checkbox-preview">
              <input
                type="checkbox"
                required={element.required}
              />
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="preview-field full-width" key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <div className="radio-preview-group">
              {element.options?.map((option, index) => (
                <label key={index} className="radio-preview">
                  <input
                    type="radio"
                    name={`radio-${element.id}`}
                    value={option}
                    required={element.required}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'dropdown':
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
            <label>
              {element.label}
              {element.required && <span className="required">*</span>}
            </label>
            <select required={element.required}>
              <option value="">Select an option</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'workflow-step':
        return (
          <div className="preview-workflow-step" key={element.id}>
            <h3>{element.label}</h3>
            <div className="preview-step-content">
              {/* Conteúdo do workflow step */}
            </div>
          </div>
        );
      
      case 'container-heading':
        return (
          <div className="preview-container-heading" key={element.id}>
            <h2>{element.label || 'Container Heading'}</h2>
          </div>
        );
      
      case 'container-subheading':
        return (
          <div className="preview-container-subheading" key={element.id}>
            <h3>{element.label || 'Container Subheading'}</h3>
          </div>
        );
      
      default:
        return (
          <div className={`preview-field ${isFullWidth ? 'full-width' : ''}`} key={element.id}>
            <label>{element.label}</label>
            <input type="text" placeholder="Field" />
          </div>
        );
    }
  };

  // Organiza elementos em linhas de 2 em 2 (exceto elementos full-width)
  const renderPreviewContent = () => {
    const rows = [];
    let currentRow = [];
    
    formElements.forEach((element) => {
      const isFullWidth = shouldTakeFullWidth(element);
      
      if (!isFullWidth && currentRow.length < 2) {
        // Adiciona ao grid atual se houver espaço
        currentRow.push(renderFormElement(element));
      } else {
        // Fecha a linha atual e começa uma nova
        if (currentRow.length > 0) {
          rows.push(
            <div key={`row-${rows.length}`} className="preview-row">
              {currentRow}
            </div>
          );
          currentRow = [];
        }
        
        // Adiciona elemento (que ocupa linha inteira)
        rows.push(
          <div key={element.id} className="preview-row">
            {renderFormElement(element)}
          </div>
        );
      }
    });
    
    // Adiciona última linha se houver elementos
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
      <div className="preview-header">
        <h2>Form Preview</h2>
        <button className="btn btn-primary" onClick={togglePreviewMode}>
          Back to Builder
        </button>
      </div>

      <div className="preview-content">
        <div className="preview-form">
          {formElements.length === 0 ? (
            <div className="preview-empty">
              <p>No form elements to preview</p>
              <p>Add some elements in the builder first</p>
            </div>
          ) : (
            <div className="preview-grid">
              {renderPreviewContent()}
            </div>
          )}
          
          {formElements.length > 0 && (
            <div className="preview-actions">
              <button type="submit" className="btn btn-primary">
                Submit Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;