import React, { useState } from 'react';
import '../styles/JsonViewer.css';
import { useFormBuilder } from '../../hooks/useFormBuilder';

const JsonViewer = () => {
  const { prepareFormData } = useFormBuilder();
  const [isVisible, setIsVisible] = useState(false);
  
  const formData = prepareFormData();
  const jsonString = JSON.stringify(formData, null, 2);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString)
      .then(() => alert('JSON copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };
  
  if (!isVisible) {
    return (
      <button className="btn-json-toggle" onClick={toggleVisibility}>
        View JSON
      </button>
    );
  }
  
  return (
    <div className="json-viewer">
      <div className="json-header">
        <h3>Form JSON Data</h3>
        <div className="json-actions">
          <button className="btn-copy" onClick={copyToClipboard}>
            Copy
          </button>
          <button className="btn-close" onClick={toggleVisibility}>
            Close
          </button>
        </div>
      </div>
      <pre className="json-content">
        {jsonString}
      </pre>
    </div>
  );
};

export default JsonViewer;