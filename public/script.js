const createListBtn = document.getElementById('createListBtn');
const generatedLinkContainer = document.getElementById('generatedLinkContainer');
const generatedLink = document.getElementById('generatedLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const listContainer = document.getElementById('listContainer');
const newItemInput = document.getElementById('newItemInput');
const addItemBtn = document.getElementById('addItemBtn');
const checklist = document.getElementById('checklist');

// Generate a new private link
createListBtn.addEventListener('click', () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/checklist/${uniqueId}`;

    // Show the generated link
    generatedLink.textContent = `Your private link: ${link}`;
    generatedLinkContainer.style.display = 'block';

    // Enable input and buttons
    newItemInput.disabled = false;
    addItemBtn.disabled = false;

    // Show list container and disable "Create a List" button
    listContainer.style.display = 'block';
    createListBtn.disabled = true;
});

// Copy the generated link to clipboard
copyLinkBtn.addEventListener('click', () => {
  const linkText = generatedLink.textContent.replace("Your private link: ", "");
  navigator.clipboard.writeText(linkText).then(() => {
      // Change the button text to "Copied"
      copyLinkBtn.textContent = "Copied";
      
      // Revert back to "Copy" after 2 seconds
      setTimeout(() => {
          copyLinkBtn.textContent = "Copy";
      }, 2000);
  }).catch(err => {
      console.error('Failed to copy link: ', err);
  });
});
// Add new item to the checklist
addItemBtn.addEventListener('click', () => {
    const itemText = newItemInput.value.trim();
    if (itemText) {
        addItemToChecklist(itemText);
        newItemInput.value = '';
    }
});

// Function to add an item to the checklist
function addItemToChecklist(itemText) {
    const listItem = document.createElement('li');

    // Item text
    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;

    // Action buttons
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editItem(listItem, textSpan));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => checklist.removeChild(listItem));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Add text and actions to list item
    listItem.appendChild(textSpan);
    listItem.appendChild(actions);

    checklist.appendChild(listItem);
}

// Edit an existing item
function editItem(listItem, textSpan) {
    const currentText = textSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('edit');
    saveBtn.addEventListener('click', () => {
        textSpan.textContent = input.value.trim() || currentText;
        listItem.replaceChild(textSpan, input);
        listItem.removeChild(saveBtn);
    });

    listItem.replaceChild(input, textSpan);
    listItem.appendChild(saveBtn);
}
