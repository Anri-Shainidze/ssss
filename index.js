// 1) Debounce for mouse position logging
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function logMousePosition(event) {
  console.log(`Mouse stopped at: X=${event.clientX}, Y=${event.clientY}`);
}

const debouncedMouseLogger = debounce(logMousePosition, 500);
window.addEventListener('mousemove', debouncedMouseLogger);

// 2) Fetch users from two APIs and render to DOM
async function fetchUsersFromBothAPIs() {
  try {
    const [res1, res2] = await Promise.all([
      fetch('https://fakestoreapi.com/users'),
      fetch('https://jsonplaceholder.typicode.com/users')
    ]);

    const [users1, users2] = await Promise.all([
      res1.json(),
      res2.json()
    ]);

    const allUsers = [...users1, ...users2];
    renderUsersToDOM(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function renderUsersToDOM(users) {
  const container = document.createElement('div');
  container.style.padding = '10px';

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.style.marginBottom = '10px';
    userDiv.style.padding = '10px';
    userDiv.style.border = '1px solid #ccc';
    userDiv.style.borderRadius = '5px';

    const name = user.name?.firstname 
      ? `${user.name.firstname} ${user.name.lastname}` 
      : user.name || 'No Name';

    const email = user.email || 'No Email';

    userDiv.innerHTML = `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}`;
    container.appendChild(userDiv);
  });

  document.body.appendChild(container);
}

fetchUsersFromBothAPIs();
