//src/components/Preview/Preview.jsx

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
   * Renderiza um elemento do formulário no modo preview
   */
  const renderFormElement = (element) => {
    switch (element.type) {
      case 'text-field':
        return (
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
          <div className="preview-field" key={element.id}>
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
      
      default:
        return (
          <div className="preview-field" key={element.id}>
            <label>{element.label}</label>
            <input type="text" placeholder="Field" />
          </div>
        );
    }
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
            formElements.map(renderFormElement)
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