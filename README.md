# Rules Management Application

This project implements a dynamic web application for managing rulesets, featuring an editable table with drag-and-drop capabilities. It provides a user-friendly interface for viewing, editing, adding, deleting, and reordering rules within different rulesets.

---

## Table of Contents

1. [Overview](#1-overview)  
2. [Features Implemented](#2-features-implemented)  
3. [Beyond Explicit Requirements](#3-beyond-explicit-requirements)  
4. [Areas for Improvement](#4-areas-for-improvement)  
5. [Setup and Installation](#5-setup-and-installation)  
6. [Usage](#6-usage)  
7. [Technologies Used](#7-technologies-used)

---

## 1. Overview

The Rules Management Application provides a streamlined way to interact with and organize sets of rules. Users can switch between different rulesets, modify rule details directly within the table, and easily reorder rules using drag-and-drop functionality.

---

## 2. Features Implemented

- **Ruleset Selection**: Select different rulesets from a dropdown menu.
- **View and Edit Modes**: Seamless transition between view and edit modes for managing rulesets.
- **Ruleset Naming**: View and edit the name of the currently selected ruleset.
- **Add New Ruleset**: Create new, empty rulesets.
* **Copy Ruleset:** Users can duplicate an existing ruleset, including all its rules. **The copied ruleset is automatically assigned a unique name (e.g., "OriginalName (copy)", "OriginalName (copy 2)"), preventing naming conflicts and ensuring distinct identification.**
- **Delete Ruleset**: Remove a ruleset with a confirmation prompt.
* **Add New Rule:** Users can add new, empty rule rows to the table in edit mode. Upon adding a new rule, the table automatically scrolls to the bottom to reveal the newly added row.
- **Inline Rule Editing**: Edit rule properties (`Measurement`, `Comparator`, `Compared Value`, `Finding Item`) directly within the table.
- **Save/Cancel Rule Edits**: Save changes to individual rule rows.
- **Delete Rule**: Remove individual rules from a ruleset.
- **Drag-and-Drop Row Reordering**: Reorder rules via drag-and-drop in edit mode.
- **Unsaved Changes Detection**: Prompt confirmation modal for unsaved changes before navigating away.
- **Responsive Layout**: Adapts layout for different screen sizes using Ant Design's grid system.

---

## 3. Beyond Explicit Requirements

- **Fixed Row Height**: Ensures consistent height for all rows, improving readability.
- **Refined Button Styling**: Styled to match design specs using color-coded visual cues.
- **Intelligent Back Button Behavior**: Always visible with logic to handle unsaved changes gracefully.
- **Modular Code Structure**: Utilizes custom React hooks (`useRulesetEditing`, `useRulesetManagement`, etc.) to improve maintainability and reusability.
- **Ant Design Icon Styling**: Custom styles for icons to match visual hierarchy.

---

## 4. Areas for Improvement

- **Backend Integration for Persistence**: Currently using in-memory mock data; backend integration would allow persistent storage.
- **Comprehensive Input Validation**: Validate inputs (e.g., numeric fields) and provide inline error messaging.
- **Optimized Save Logic**: Consolidate to a unified "Save All" function for ruleset and rule changes.
- **Enhanced Accessibility**: Improve keyboard interactions, especially for drag-and-drop.
- **Unit and Integration Testing**: Add tests for hooks, components, and Redux logic.
- **Performance Optimization for Large Datasets**: Use virtualization (e.g., `react-window`) to improve performance with many rules.
- **Theming and Customization**: Extend customization beyond Ant Design defaults via theming.

---

## 5. Setup and Installation

First, clone the repository:
`git clone https://github.com/YOUR_USERNAME/rules-app.git`

### Option 1: Using Docker

1. Make sure you have Docker and Docker Compose installed on your system
2. Navigate to project directory: `cd rules-app`
3. Run: `docker compose up --build`
4. Access the application at: http://localhost:5173

To stop the application, run: `docker compose down`

### Option 2: Local Development

1. Prerequisites:
   - Node.js (version 20 or higher)
   - Yarn package manager

2. Navigate to project directory: `cd rules-app`
3. Install dependencies: `yarn install`
4. Start the development server: `yarn dev`
5. Access the application at: http://localhost:5173
