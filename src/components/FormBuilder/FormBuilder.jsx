import React from 'react';
import '../../styles/FormBuilder.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import Preview from '../Preview/Preview';

/**
 * Componente individual de elemento do formulário
 */
const FormElement = ({ 
  element, 
  isSelected, 
  onSelect, 
  setDraggedElementId, 
  handleElementDrop,
  layoutMode,
  onDelete
}) => {
  const { toggleElementWidth } = useFormBuilder();

  /**
   * Manipula o início do drag para reordenar
   */
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/form-element-id', element.id);
    setDraggedElementId(element.id);
    e.currentTarget.classList.add('dragging');
  };

  /**
   * Manipula o fim do drag
   */
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedElementId(null);
  };

  /**
   * Permite o drop no elemento para reordenar
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  };

  /**
   * Remove a classe quando o drag sai do elemento
   */
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  /**
   * Manipula o drop para reordenar
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const draggedId = e.dataTransfer.getData('application/form-element-id');
    if (draggedId && draggedId !== element.id) {
      handleElementDrop(element.id);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(element);
  };

  /**
   * Alterna a largura do elemento entre full e half
   */
  const handleToggleWidth = (e) => {
    e.stopPropagation();
    toggleElementWidth(element.id);
  };

  /**
   * Remove o elemento
   */
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(element.id, e);
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
              <option value="">Select an option</option>
              {element.options && element.options.map((option, index) => (
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
      
      case 'container-heading':
        return (
          <div className="container-heading">
            <h2>{element.label || 'Container Heading'}</h2>
          </div>
        );
      
      case 'container-subheading':
        return (
          <div className="container-subheading">
            <h3>{element.label || 'Container Subheading'}</h3>
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

  // Determina classes CSS baseadas na largura
  const widthClass = element.width === 'full' ? 'full-width' : 'half-width';
  const canToggleWidth = !['workflow-step', 'textarea', 'container-heading', 'container-subheading'].includes(element.type);

  return (
    <div
      className={`form-element ${isSelected ? 'selected' : ''} ${widthClass}`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Ícone de arrastar - setas para cima/baixo */}
      <div className="drag-handle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 19v-2h10v2H7zm0-6v-2h10v2H7zm0-6V5h10v2H7z"/>
        </svg>
      </div>
      
      {getElementContent()}
      
      {isSelected && (
        <div className="element-actions">
          {layoutMode === 'grid' && canToggleWidth && (
            <button 
              className="btn-action" 
              onClick={handleToggleWidth}
              title={`Toggle width: ${element.width === 'full' ? 'Make half width' : 'Make full width'}`}
            >
              {element.width === 'full' ? '½ Width' : 'Full Width'}
            </button>
          )}
          <button className="btn-action delete-btn" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Área principal de construção do formulário
 * Suporta drag and drop e edição de elementos
 */
const FormBuilder = () => {
  const {
    formElements,
    selectedElement,
    isPreviewMode,
    layoutMode,
    addFormElement,
    setSelectedElement,
    togglePreviewMode,
    setDraggedElementId,
    handleElementDrop,
    setGlobalLayoutMode,
    removeElement
  } = useFormBuilder();

  /**
   * Manipula o drop de NOVOS elementos na área de construção
   */
  const handleNewElementDrop = (e) => {
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

  /**
   * Alterna entre layout vertical e grid
   */
  const toggleLayoutMode = (mode) => {
    setGlobalLayoutMode(mode);
  };

  /**
   * Remove um elemento
   */
  const handleDeleteElement = (elementId, e) => {
    e.stopPropagation();
    removeElement(elementId);
  };

  // Se estiver no modo preview, mostra o preview
  if (isPreviewMode) {
    return <Preview />;
  }

  // Função para agrupar elementos em linhas baseado na largura
  const renderFormRows = () => {
    if (formElements.length === 0) return null;

    // Se estiver no modo vertical, renderiza tudo em full width
    if (layoutMode === 'vertical') {
      return formElements.map((element, index) => (
        <div key={`row-${index}`} className="form-row">
          <FormElement
            key={element.id}
            element={element}
            index={index}
            isSelected={selectedElement?.id === element.id}
            onSelect={handleElementSelect}
            setDraggedElementId={setDraggedElementId}
            handleElementDrop={handleElementDrop}
            layoutMode={layoutMode}
            onDelete={handleDeleteElement}
          />
        </div>
      ));
    }

    // Modo grid - agrupa elementos inteligentemente
    const rows = [];
    let currentRow = [];
    let currentRowItems = 0; // Contador de elementos na linha atual

    formElements.forEach((element, index) => {
      const isFullWidth = element.width === 'full';
      
      // Se o elemento for full-width OU já temos 2 elementos na linha
      if (isFullWidth || currentRowItems === 2) {
        // Fecha a linha atual se houver elementos
        if (currentRow.length > 0) {
          rows.push(
            <div key={`row-${rows.length}`} className="form-row">
              {currentRow}
            </div>
          );
        }
        // Começa nova linha com este elemento
        currentRow = [
          <FormElement
            key={element.id}
            element={element}
            index={index}
            isSelected={selectedElement?.id === element.id}
            onSelect={handleElementSelect}
            setDraggedElementId={setDraggedElementId}
            handleElementDrop={handleElementDrop}
            layoutMode={layoutMode}
            onDelete={handleDeleteElement}
          />
        ];
        currentRowItems = isFullWidth ? 2 : 1; // Full-width conta como 2 slots
      } 
      // Se temos espaço na linha atual (menos de 2 elementos)
      else if (currentRowItems < 2) {
        // Adiciona à linha atual
        currentRow.push(
          <FormElement
            key={element.id}
            element={element}
            index={index}
            isSelected={selectedElement?.id === element.id}
            onSelect={handleElementSelect}
            setDraggedElementId={setDraggedElementId}
            handleElementDrop={handleElementDrop}
            layoutMode={layoutMode}
            onDelete={handleDeleteElement}
          />
        );
        currentRowItems += 1; // Half-width conta como 1 slot
      }
    });
    
    // Adiciona última linha se houver elementos
    if (currentRow.length > 0) {
      rows.push(
        <div key={`row-${rows.length}`} className="form-row">
          {currentRow}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="form-builder">
      <div className="form-builder-header">
        <h2>Form Builder</h2>
        <div className="form-builder-controls">
          <div className="layout-toggle">
            <button 
              className={`layout-btn ${layoutMode === 'vertical' ? 'active' : ''}`}
              onClick={() => toggleLayoutMode('vertical')}
              title="Layout vertical (1 coluna)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V7H3v2z"/>
              </svg>
              <span>Vertical</span>
            </button>
            <button 
              className={`layout-btn ${layoutMode === 'grid' ? 'active' : ''}`}
              onClick={() => toggleLayoutMode('grid')}
              title="Layout em grid (2 colunas)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
              </svg>
              <span>Grid</span>
            </button>
          </div>
          <div className="form-builder-actions">
            <button className="btn btn-secondary">CANCEL</button>
            <button className="btn btn-primary">SAVE</button>
            <button className="btn btn-info" onClick={togglePreviewMode}>
              PREVIEW
            </button>
            <button className="btn btn-success">PUBLISH</button>
          </div>
        </div>
      </div>

      <div
        className="form-builder-area"
        onDrop={handleNewElementDrop}
        onDragOver={handleDragOver}
      >
        {formElements.length === 0 ? (
          <div className="empty-state">
            <p>Drag and drop form elements here</p>
            <small>Start building your form by dragging elements from the sidebar</small>
            <div className="layout-info">
              <p><strong>Layout Options:</strong></p>
              <ul>
                <li>Use <strong>Vertical Layout</strong> for 1 column</li>
                <li>Use <strong>Grid Layout</strong> for 2 columns</li>
                <li>In Grid mode, elements can be half-width (50%) or full-width (100%)</li>
                <li>A single half-width element can be alone on a line</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={`form-elements-container ${layoutMode}`}>
            {renderFormRows()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;