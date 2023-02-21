import { DragEvent, useState } from 'react';

function SortableList() {
  const [items, setItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
  ]);

  const onDragStart = (event: any, index: number) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const onDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const onDrop = (event: any, index: number) => {
    const draggedIndex = event.dataTransfer.getData('text');
    console.log(draggedIndex)
    console.log(index)
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <ul>
      {items.map(({ id, content }, index) => (
        <li
          key={id}
          draggable
          onDragStart={(event) => onDragStart(event, index)}
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, index)}
        >
          {content}
        </li>
      ))}
    </ul>
  );
}

export default SortableList
