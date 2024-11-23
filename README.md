This is a project illustrating use of a custom table component.
It is using

- typescript
- react
- react-create-app
- axios
- axios-mock-adapter
- testing-library/react
- use-debounce
- scss
- prettier, eslint

## Getting Started

First, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Alternatively for optimized build run

```bash
npm run build
```

To run tests

```bash
npm run test
```

---

## Table Component Documentation

### Overview

The `Table` component provides a flexible and customizable table layout for displaying data sets in React applications. It supports custom cell rendering, loading states, and error handling. The component is ideal for displaying any tabular data, particularly when each cell or row might require specific formatting or behavior.

### API Reference

#### Props

- **data (`T[]`)**: Array of data items to be displayed. Each item must extend from `BaseTableItem`.
- **columns (`TableColumn<T, K>[]`)**: Configuration for table columns. Each column can define a custom renderer.
- **isLoading (`boolean`)** _(optional)_: Shows a loading indicator if true. Default is `false`.
- **error (`string | null`)** _(optional)_: Displays an error message. Default is `null`.
- **renderRow (`item: T, index: number, children: ReactNode) => ReactNode`)** _(optional)_: Custom row render function.

#### Interfaces

##### `TableProps<T, K extends keyof T>`

Describes the props accepted by the `Table` component, including data, columns, and optional flags for loading and error states.

##### `RenderedCell<T>`

Provides the data and row index for a cell, facilitating custom rendering logic based on the row index.

##### `TableColumn<T, K extends keyof T>`

Defines a single column's configuration in the table, including label, accessor for data extraction, and an optional custom cell renderer.

#### Types

##### `BaseTableItem`

Defines a minimal structure for data items, requiring an `id` that can be either a number or a string.

#### Pagination

The table includes simple front end pagination 

### Usage Examples

#### Basic Example

Render a simple table without custom cell rendering:

```jsx
<Table
  data={userData}
  columns={[
    { label: 'ID', accessor: 'id' },
    { label: 'Name', accessor: 'name' },
    { label: 'Email', accessor: 'email' },
  ]}
/>
```

#### Advanced Example

Render a table with custom cell rendering that highlights the name in bold, and sets different background row color

```jsx
<Table
  data={userData}
  columns={[
    { label: 'ID', accessor: 'id' },
    {
      label: 'Name',
      accessor: 'name',
      renderCellContent: ({ rowData }) => <strong>{rowData.name}</strong>,
    },
    { label: 'Email', accessor: 'email' },
  ]}
  renderRow={(row, index, children) => (
    <tr
      key={row.id}
      className="table__row"
      style={{ backgroundColor: 'rgb(253, 186, 116)' }}
      aria-rowindex={index + 1}
    >
      {children}
    </tr>
  )}
/>
```

### Ideas for Further improvements

- table pagination: infinite scroll with data fetching using Intersection Observer API
- create user form: improved form validation, custom messages displayed to user, ui improvements like red borders etc.
- unit tests - covering the important functionality (currently Table component test)



