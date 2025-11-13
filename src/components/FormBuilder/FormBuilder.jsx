//src/components/FormBuilder/FormBuilder.jsx

import React from 'react';
import '../../styles/FormBuilder.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import Preview from '../Preview/Preview';

/**
 * Área principal de construção do formulário
 * Suporta drag and drop e edição de elementos
 */
const FormBuilder = () => {
  const {
    formElements,
    selectedElement,
    isPreviewMode,
    addFormElement,
    setSelectedElement,
    togglePreviewMode
  } = useFormBuilder();

  /**
   * Manipula o drop de elementos na área de construção
   */
  const handleDrop = (e) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('application/form-element');
    
    if (elementType) {
      addFormElement(elementType);
    }
  };

  /**
   * Permite o drop na área
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  /**
   * Manipula a seleção de um elemento
   */
  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  // Se estiver no modo preview, mostra o preview
  if (isPreviewMode) {
    return <Preview />;
  }

  return (
    <div className="form-builder">
      <div className="form-builder-header">
        <h2>Form Builder</h2>
        <div className="form-builder-actions">
          <button className="btn btn-secondary">CANCEL</button>
          <button className="btn btn-primary">SAVE</button>
          <button className="btn btn-info" onClick={togglePreviewMode}>
            PREVIEW
          </button>
          <button className="btn btn-success">PUBLISH</button>
        </div>
      </div>

      <div
        className="form-builder-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {formElements.length === 0 ? (
          <div className="empty-state">
            <p>Drag and drop form elements here</p>
            <small>Start building your form by dragging elements from the sidebar</small>
          </div>
        ) : (
          <div className="form-elements-container">
            {formElements.map((element, index) => (
              <FormElement
                key={element.id}
                element={element}
                index={index}
                isSelected={selectedElement?.id === element.id}
                onSelect={handleElementSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Componente individual de elemento do formulário
 */
const FormElement = ({ element, isSelected, onSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(element);
  };

  const getElementContent = () => {
    switch (element.type) {
      case 'text-field':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <input type="text" placeholder={element.placeholder} />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <textarea placeholder={element.placeholder} rows="3" />
          </div>
        );
      
      case 'date-picker':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <input type="date" />
          </div>
        );
      
      case 'time':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <input type="time" />
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="form-field">
            <label className="checkbox-label">
              <input type="checkbox" />
              {element.label}
            </label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name={`radio-${element.id}`} />
                Option 1
              </label>
              <label className="radio-label">
                <input type="radio" name={`radio-${element.id}`} />
                Option 2
              </label>
            </div>
          </div>
        );
      
      case 'dropdown':
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <select>
              {element.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'workflow-step':
        return (
          <div className="workflow-step">
            <h3>{element.label}</h3>
            <div className="step-content">
              {/* Conteúdo do workflow step */}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="form-field">
            <label>{element.label}</label>
            <input type="text" placeholder="Field" />
          </div>
        );
    }
  };

  return (
    <div
      className={`form-element ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {getElementContent()}
      {isSelected && (
        <div className="element-actions">
          <button className="btn-action">Edit</button>
          <button className="btn-action">Delete</button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;