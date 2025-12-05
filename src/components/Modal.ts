import { createCard } from './Card';

export function createModal(onSubmit: (data: { title: string, subtitle: string, description: string }) => void, onCancel: () => void) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';

  const title = document.createElement('h2');
  title.textContent = 'Add New Card';
  modal.appendChild(title);

  const form = document.createElement('form');
  
  // Title Input
  const titleGroup = createInputGroup('title', 'Title', 'text');
  form.appendChild(titleGroup);

  // Subtitle Input
  const subtitleGroup = createInputGroup('subtitle', 'Subtitle', 'text');
  form.appendChild(subtitleGroup);

  // Description Input
  const descGroup = createInputGroup('description', 'Description', 'textarea');
  form.appendChild(descGroup);

  // Buttons
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'modal-buttons';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Add Card';
  submitBtn.className = 'btn-primary';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'btn-secondary';
  cancelBtn.addEventListener('click', () => {
    overlay.remove();
    onCancel();
  });

  buttonGroup.appendChild(cancelBtn);
  buttonGroup.appendChild(submitBtn);
  form.appendChild(buttonGroup);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    onSubmit({
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      description: formData.get('description') as string,
    });
    overlay.remove();
  });

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Focus first input
  const firstInput = form.querySelector('input');
  if (firstInput) firstInput.focus();
}

function createInputGroup(name: string, labelText: string, type: string): HTMLDivElement {
  const group = document.createElement('div');
  group.className = 'form-group';

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  let input: HTMLInputElement | HTMLTextAreaElement;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 3;
  } else {
    input = document.createElement('input');
    input.type = type;
  }
  input.id = name;
  input.name = name;
  input.required = true;

  group.appendChild(label);
  group.appendChild(input);

  return group;
}

