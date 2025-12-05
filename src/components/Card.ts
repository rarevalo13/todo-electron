export interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export function createCard(data: CardData): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'card';
  card.draggable = true;
  card.id = data.id;

  // Drag events
  card.addEventListener('dragstart', (e) => {
    // Only drag if we're not clicking the delete button
    if ((e.target as HTMLElement).classList.contains('delete-btn')) {
      e.preventDefault();
      return;
    }
    
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', card.id);
      e.dataTransfer.effectAllowed = 'move';
    }
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '×';
  deleteBtn.className = 'delete-btn';
  deleteBtn.title = 'Delete card';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent drag start or other click events
    if (confirm('Are you sure you want to delete this card?')) {
      card.remove();
    }
  });
  card.appendChild(deleteBtn);

  const heading = document.createElement('h2');
  heading.textContent = data.title;
  heading.className = 'card-heading';
  card.appendChild(heading);

  const subHeading = document.createElement('h3');
  subHeading.textContent = data.subtitle;
  subHeading.className = 'card-subheading';
  card.appendChild(subHeading);

  const description = document.createElement('p');
  description.textContent = data.description;
  description.className = 'card-description';
  card.appendChild(description);

  return card;
}
