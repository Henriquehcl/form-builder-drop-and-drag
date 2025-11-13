//src/hooks/useFormBuilder.js

import React, { createContext, useContext, useState, useCallback } from 'react';

// Context para gerenciar o estado global do form builder
const FormBuilderContext = createContext();

/**
 * Hook personalizado para acessar o contexto do form builder
 */
export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};

/**
 * Provider do form builder que gerencia o estado global
 */
export const FormBuilderProvider = ({ children }) => {
  // Estado dos elementos do formulário
  const [formElements, setFormElements] = useState([]);
  
  // Elemento atualmente selecionado
  const [selectedElement, setSelectedElement] = useState(null);
  
  // Estado do modo de preview
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  /**
   * Adiciona um novo elemento ao formulário
   */
  const addFormElement = useCallback((elementType) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      label: `${elementType} Field`,
      required: false,
      placeholder: '',
      options: elementType === 'dropdown' ? ['Option 1', 'Option 2'] : [],
      value: ''
    };

    setFormElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  }, []);

  /**
   * Atualiza as propriedades de um elemento
   */
  const updateElementProperties = useCallback((elementId, properties) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === elementId ? { ...element, ...properties } : element
      )
    );
    
    // Atualiza também o elemento selecionado se for o mesmo
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(prev => ({ ...prev, ...properties }));
    }
  }, [selectedElement]);

  /**
   * Remove um elemento do formulário
   */
  const removeElement = useCallback((elementId) => {
    setFormElements(prev => prev.filter(element => element.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  /**
   * Move um elemento na lista (reordenar)
   */
  const moveElement = useCallback((fromIndex, toIndex) => {
    setFormElements(prev => {
      const newElements = [...prev];
      const [movedElement] = newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, movedElement);
      return newElements;
    });
  }, []);

  /**
   * Alterna entre modo de edição e preview
   */
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const value = {
    formElements,
    selectedElement,
    isPreviewMode,
    addFormElement,
    updateElementProperties,
    removeElement,
    moveElement,
    setSelectedElement,
    togglePreviewMode
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};