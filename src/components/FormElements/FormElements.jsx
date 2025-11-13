//src/components/FormElements/FormElements.jsx

import React from 'react';
import '../../styles/FormElements.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

/**
 * Componente que representa um grupo de elementos na sidebar
 * Permite arrastar elementos para a área de construção
 */
const FormElements = ({ title, elements }) => {
  const { addFormElement } = useFormBuilder();

  /**
   * Manipula o início do drag de um elemento
   */
  const handleDragStart = (e, elementType) => {
    e.dataTransfer.setData('application/form-element', elementType);
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Manipula o clique para adicionar elemento
   */
  const handleElementClick = (elementType) => {
    addFormElement(elementType);
  };

  return (
    <div className="form-elements-group">
      <h3 className="form-elements-title">{title}</h3>
      <div className="form-elements-list">
        {elements.map((element, index) => (
          <div
            key={index}
            className="form-element-item"
            draggable
            onDragStart={(e) => handleDragStart(e, element.type)}
            onClick={() => handleElementClick(element.type)}
          >
            {element.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElements;