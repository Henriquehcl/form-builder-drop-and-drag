//src/components/Sidebar/Sidebar.jsx

import React from 'react';
import '../../styles/Sidebar.css';
import FormElements from '../FormElements/FormElements';

/**
 * Sidebar que contém todos os elementos disponíveis para o formulário
 * Organizados em categorias como no print
 */
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Form Elements</h2>
      </div>
      
      <div className="sidebar-content">
        {/* Containers */}
        <FormElements 
          title="Containers"
          elements={[
            { type: 'workflow-step', label: 'WORKFLOW STEP' }
          ]}
        />

        {/* Test Elements */}
        <FormElements 
          title="Test Elements"
          elements={[
            { type: 'text-field', label: 'TEST FIELD' },
            { type: 'textarea', label: 'NOTES' }
          ]}
        />

        {/* Date Elements */}
        <FormElements 
          title="Date Elements"
          elements={[
            { type: 'date-picker', label: 'DATE PICKER' },
            { type: 'time', label: 'TIME' }
          ]}
        />

        {/* Other Elements */}
        <FormElements 
          title="Other Elements"
          elements={[
            { type: 'radio', label: 'RADIO' },
            { type: 'dropdown', label: 'DROPDOWN' },
            { type: 'checkbox', label: 'CHECKBOX' },
            { type: 'signature', label: 'SIGNATURE' }
          ]}
        />

        {/* Media Elements */}
        <FormElements 
          title="Media Elements"
          elements={[
            { type: 'file-upload', label: 'UPLOAD' },
            { type: 'image', label: 'IMAGE' }
          ]}
        />

        {/* Issue */}
        <FormElements 
          title="Issue"
          elements={[
            { type: 'stage', label: 'Stage 1' },
            { type: 'container-heading', label: 'Container Heading' },
            { type: 'container-subheading', label: 'Container Subheading' }
          ]}
        />
      </div>
    </div>
  );
};

export default Sidebar;