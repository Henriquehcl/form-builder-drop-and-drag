# Form Builder React

### Um construtor de formulários drag-and-drop construído com React, permitindo criar formulários complexos de maneira visual e intuitiva.

## 📋 Funcionalidades
* Drag & Drop: Arraste elementos da sidebar para a área de construção

* Reordenação: Arraster elementos para reorganizar a ordem

* Edição em Tempo Real: Modifique propriedades dos elementos no painel lateral

* Preview: Visualize o formulário final antes de publicar

* Múltiplos Tipos de Elementos: Campos de texto, data, dropdown, checkbox, radio, etc.

* Persistência: Dados salvos automaticamente no localStorage

## 🏗️ Estrutura do Projeto

```

form-builder-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   ├── FormBuilder/
│   │   │   ├── FormBuilder.jsx
│   │   ├── PropertiesPanel/
│   │   │   ├── PropertiesPanel.jsx
│   │   ├── FormElements/
│   │   │   ├── FormElements.jsx
│   │   └── Preview/
│   │       ├── Preview.jsx
│   ├── hooks/
│   │   ├── useFormBuilder.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── formUtils.js
│   ├── styles/
│   │   │   ├── Sidebar.css
│   │   │   └── App.css
│   │   │   └── FormBuilder.css
│   │   │   └── PropertiesPanel.css
│   │   │   └── FormElements.css
│   │       └── Preview.css
│   │   │   └── index.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md

```

# 📁 Descrição dos Arquivos

## 🎯 Componentes Principais
```
App.jsx
```
**Função:** Componente raiz da aplicação

**Responsabilidade:** Organiza o layout principal em três colunas (Sidebar, FormBuilder, PropertiesPanel)

**Contexto:** Envolve a aplicação com o FormBuilderProvider para gerenciamento de estado global

```
components/Sidebar/Sidebar.jsx
```
**Função:** Barra lateral com elementos disponíveis para o formulário

**Características:**

Organizada por categorias (Containers, Test Elements, Date Elements, etc.)

Elementos arrastáveis para a área de construção

Interface intuitiva baseada no design do print

```
components/FormBuilder/FormBuilder.jsx
```
**Função:** Área principal de construção do formulário

**Funcionalidades:**

Recebe elementos arrastados da sidebar

Sistema completo de drag & drop para reordenar elementos

Renderização condicional baseada no tipo de elemento

Botões de ação (CANCEL, SAVE, PREVIEW, PUBLISH)

```
components/PropertiesPanel/PropertiesPanel.jsx
```
**Função:** Painel de edição de propriedades dos elementos

**Características:**

Edição em tempo real de label, placeholder, opções

Propriedades específicas por tipo de elemento

Ações como deletar elemento

Instruções de uso do drag & drop

```
components/FormElements/FormElements.jsx
```
**Função:** Componente reutilizável para grupos de elementos na sidebar

**Responsabilidade:** Renderiza categorias de elementos com seus respectivos itens

components/Preview/Preview.jsx
**Função:** Modo de visualização do formulário final

**Características:**

Mostra o formulário como aparecerá para usuários finais

Remove controles de edição

Botão para voltar ao modo de edição

## 🎣 Hooks Personalizados
```
hooks/useFormBuilder.js
```
**Função:** Gerenciamento de estado global do form builder

**Estado Gerenciado:**

**formElements:** Array com todos os elementos do formulário

**selectedElement:** Elemento atualmente selecionado

**isPreviewMode:** Controla modo de preview/edição

**draggedElement:** Elemento sendo arrastado

**Ações:** Adicionar, remover, atualizar e reordenar elementos

```
hooks/useLocalStorage.js
```
**Função:** Hook para persistência de dados no localStorage

**Características:** Sincroniza estado React com localStorage automaticamente

## 🔧 Utilitários

```
utils/formUtils.js
```
**Função:** Funções auxiliares para o form builder

**Utilidades:**

**generateId():** Gera IDs únicos para elementos

**isContainerElement():** Valida se elemento é container

**getInputType():** Mapeia tipos do builder para HTML

**formatLabel():** Formata labels para exibição

## 🎨 Estilos
```
styles/App.css
```
**Função:** Estilos do layout principal da aplicação

**Características:** Grid de três colunas responsivo

```
styles/Sidebar.css
```
**Função:** Estilos da barra lateral de elementos

**Características:** Design baseado no print com categorias organizadas

```
styles/FormBuilder.css
```
**Função:** Estilos da área de construção

**Destaques:**

Estados visuais para drag & drop

Feedback visual durante operações

Design dos elementos do formulário

```
styles/PropertiesPanel.css
```
**Função:** Estilos do painel de propriedades

**Características:** Formulários de edição organizados por grupos

```
styles/FormElements.css
```
**Função:** Estilos dos elementos na sidebar

**Destaques:** Efeitos hover e estados de drag

```
styles/Preview.css
```
**Função:** Estilos do modo de preview

**Características:** Aparencia limpa sem controles de edição

```
styles/index.css
```
**Função:** Estilos globais e reset CSS

**Características:** Reset de estilos e utilitários globais

## 📄 Arquivos de Configuração
```
package.json
```
**Função:** Configuração do projeto e dependências

**Dependências:** React, ReactDOM, React Scripts

**Scripts:** start, build, test, eject

```
public/index.html
```
**Função:** Template HTML base

**Características:** Estrutura mínima com div#root para React

# 🚀 Como Executar
1. Instalação:

```
npm install
```
2. Desenvolvimento:

```
npm start
```

3. Build para produção:

```
npm run build
```

# 💡 Como Usar
## Adicionando Elementos
1. Arraste elementos da sidebar para a área de construção

2. Ou clique nos elementos para adicioná-los automaticamente

## Editando Elementos
1. Clique em qualquer elemento no form builder para selecioná-lo

2. Use o painel de propriedades à direita para modificar:

    * Label do campo

    * Placeholder

    * Opções (para dropdown/radio)

    * Campo obrigatório

## Reordenando Elementos
1. Use o ícone de arrastar (⋮⋮) no canto superior esquerdo de cada elemento

2. Arraste para cima ou para baixo para reordenar

3. Solte na posição desejada

## Visualizando o Formulário
1. Clique no botão "PREVIEW" para ver o formulário final

2. Use "Back to Builder" para retornar à edição

# 🛠️ Tecnologias Utilizadas
* React 18: Biblioteca principal para interface

* Context API: Gerenciamento de estado global

* CSS3: Estilização com flexbox e grid

* HTML5 Drag & Drop API: Funcionalidades de arrastar e soltar

* LocalStorage: Persistência de dados no navegador

# 🔄 Fluxo de Dados
* Estado Global → Gerenciado pelo useFormBuilder

* Componentes → Consomem estado via Context

* Ações do Usuário → Disparam atualizações no estado

* Persistência → Dados salvos automaticamente no localStorage

* Renderização → Interface atualizada em tempo real

# 🎯 Próximas Funcionalidades
* Exportar formulário como JSON/HTML

* Validações customizadas

* Temas e estilos customizáveis

* Colunas e layouts responsivos

* Importar formulários existentes

# 📝 Notas de Desenvolvimento
Este projeto foi construído do zero sem dependências externas de UI, utilizando apenas React puro e CSS. O sistema de drag & drop implementa tanto a adição de novos elementos quanto a reordenação dos existentes, com feedback visual completo.