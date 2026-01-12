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

  // Elemento sendo arrastado atualmente
  const [draggedElement, setDraggedElement] = useState(null);

  // Layout mode global
  const [layoutMode, setLayoutMode] = useState('vertical'); // 'vertical' ou 'grid'

  /**
   * Adiciona um novo elemento ao formulário
   */
  const addFormElement = useCallback((elementType) => {
    const newElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: elementType,
      label: `${elementType.replace('-', ' ')} Field`,
      required: false,
      placeholder: '',
      options: ['Option 1', 'Option 2'],
      value: '',
      width: 'full' // 'full' ou 'half' - propriedade individual de cada elemento
    };

    // Para alguns elementos, definir largura padrão como full
    const fullWidthElements = ['workflow-step', 'textarea', 'container-heading', 'container-subheading'];
    if (fullWidthElements.includes(elementType)) {
      newElement.width = 'full';
    } else {
      // Para outros elementos, começar com half se estiver no modo grid
      newElement.width = 'half';
    }

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
   * Move um elemento na lista (reordenar via drag and drop)
   */
  const moveElement = useCallback((draggedId, targetId) => {
    setFormElements(prev => {
      const elements = [...prev];
      const draggedIndex = elements.findIndex(el => el.id === draggedId);
      const targetIndex = elements.findIndex(el => el.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const [movedElement] = elements.splice(draggedIndex, 1);
      elements.splice(targetIndex, 0, movedElement);
      return elements;
    });
  }, []);

  /**
   * Define o elemento que está sendo arrastado
   */
  const setDraggedElementId = useCallback((elementId) => {
    setDraggedElement(elementId);
  }, []);

  /**
   * Manipula o drop para reordenar elementos (renomeado para evitar conflito)
   */
  const handleElementDrop = useCallback((targetId) => {
    if (draggedElement && draggedElement !== targetId) {
      moveElement(draggedElement, targetId);
    }
    setDraggedElement(null);
  }, [draggedElement, moveElement]);

  /**
   * Alterna entre modo de edição e preview
   */
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  /**
   * Alterna o modo de layout
   */
  const setGlobalLayoutMode = useCallback((mode) => {
    setLayoutMode(mode);
    
    // Quando mudar para grid, ajusta elementos pequenos para half width
    if (mode === 'grid') {
      setFormElements(prev => prev.map(element => {
        const fullWidthElements = ['workflow-step', 'textarea', 'container-heading', 'container-subheading'];
        if (!fullWidthElements.includes(element.type) && element.width === 'full') {
          return { ...element, width: 'half' };
        }
        return element;
      }));
    }
  }, []);

  /**
   * Alterna a largura de um elemento entre full e half
   */
  const toggleElementWidth = useCallback((elementId) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === elementId 
          ? { ...element, width: element.width === 'full' ? 'half' : 'full' }
          : element
      )
    );
    
    // Atualiza também o elemento selecionado se for o mesmo
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(prev => ({ 
        ...prev, 
        width: prev.width === 'full' ? 'half' : 'full' 
      }));
    }
  }, [selectedElement]);

  const value = {
    formElements,
    selectedElement,
    isPreviewMode,
    layoutMode,
    draggedElement,
    addFormElement,
    updateElementProperties,
    removeElement,
    moveElement,
    setSelectedElement,
    setDraggedElementId,
    handleElementDrop,
    togglePreviewMode,
    setGlobalLayoutMode,
    toggleElementWidth
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};