//src/utils/formUtils.js

/**
 * Utilitários para o form builder
 */

/**
 * Gera um ID único para elementos
 */
export const generateId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Valida se um elemento é do tipo container
 */
export const isContainerElement = (elementType) => {
  const containerTypes = ['container', 'section', 'workflow-step'];
  return containerTypes.includes(elementType);
};

/**
 * Valida se um elemento é do tipo input
 */
export const isInputElement = (elementType) => {
  const inputTypes = [
    'text', 'email', 'number', 'password', 'textarea', 
    'date', 'time', 'checkbox', 'radio', 'dropdown'
  ];
  return inputTypes.includes(elementType);
};

/**
 * Obtém o tipo de input HTML baseado no tipo do elemento do form builder
 */
export const getInputType = (elementType) => {
  const typeMap = {
    'text-field': 'text',
    'email-field': 'email',
    'number-field': 'number',
    'password-field': 'password',
    'textarea': 'textarea',
    'date-picker': 'date',
    'time': 'time',
    'checkbox': 'checkbox',
    'radio': 'radio',
    'dropdown': 'select'
  };
  
  return typeMap[elementType] || 'text';
};

/**
 * Formata o label para exibição
 */
export const formatLabel = (elementType) => {
  const labelMap = {
    'text-field': 'Text Field',
    'email-field': 'Email Field',
    'number-field': 'Number Field',
    'password-field': 'Password Field',
    'textarea': 'Text Area',
    'date-picker': 'Date Picker',
    'time': 'Time',
    'checkbox': 'Checkbox',
    'radio': 'Radio Button',
    'dropdown': 'Dropdown',
    'file-upload': 'File Upload',
    'signature': 'Signature',
    'container': 'Container',
    'section': 'Section'
  };
  
  return labelMap[elementType] || elementType;
};