import { createCard } from './Card';
import { createModal } from './Modal';

export function createBoard(container: HTMLElement) {
  const board = document.createElement('div');
  board.className = 'board';

  const columns = ['To Do', 'In Progress', 'Done'];

  columns.forEach(title => {
    const column = document.createElement('div');
    column.className = 'column';
    
    // Header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'column-header-container';

    const header = document.createElement('h2');
    header.textContent = title;
    header.className = 'column-header';
    headerContainer.appendChild(header);

    // Add Button
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.className = 'add-card-btn';
    addButton.title = 'Add new card';
    headerContainer.appendChild(addButton);

    column.appendChild(headerContainer);

    const cardContainer = document.createElement('div');
    cardContainer.className = 'column-content';
    column.appendChild(cardContainer);

    // Add Button Logic
    addButton.addEventListener('click', () => {
      createModal((data) => {
        const newCard = createCard({
          id: `card-${Date.now()}`, // Simple ID generation
          title: data.title,
          subtitle: data.subtitle,
          description: data.description
        });
        cardContainer.appendChild(newCard);
      }, () => {
        // Cancelled
      });
    });

    // Drag and Drop Logic
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(cardContainer, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (draggable) {
        if (afterElement == null) {
          cardContainer.appendChild(draggable);
        } else {
          cardContainer.insertBefore(draggable, afterElement);
        }
      }
    });

    board.appendChild(column);
  });

  container.appendChild(board);
}

function getDragAfterElement(container: Element, y: number) {
  const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null } as { offset: number, element: Element | null }).element;
}

