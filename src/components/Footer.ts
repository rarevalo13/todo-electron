export function createFooter(container: HTMLElement) {
  const footer = document.createElement('footer');
  footer.className = 'app-footer';

  const leftGroup = document.createElement('div');
  leftGroup.className = 'footer-left';

  // Check Update Button
  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Check for Updates';
  updateBtn.className = 'btn-secondary btn-sm';
  updateBtn.addEventListener('click', () => {
    // @ts-ignore
    window.electronAPI.checkUpdate();
  });
  leftGroup.appendChild(updateBtn);

  // Install Button (Hidden by default)
  const installBtn = document.createElement('button');
  installBtn.textContent = 'Restart & Install';
  installBtn.className = 'btn-primary btn-sm hidden';
  installBtn.addEventListener('click', () => {
    // @ts-ignore
    window.electronAPI.installUpdate();
  });
  leftGroup.appendChild(installBtn);

  // Status Display
  const statusSpan = document.createElement('span');
  statusSpan.id = 'update-status';
  statusSpan.className = 'update-status';
  leftGroup.appendChild(statusSpan);

  footer.appendChild(leftGroup);

  // Version Display
  const versionSpan = document.createElement('span');
  versionSpan.id = 'app-version';
  versionSpan.textContent = 'v...';
  versionSpan.className = 'app-version';
  footer.appendChild(versionSpan);

  container.appendChild(footer);

  // Initialize Version
  // @ts-ignore
  if (window.electronAPI) {
    // @ts-ignore
    window.electronAPI.getAppVersion().then((version: string) => {
      versionSpan.textContent = `v${version}`;
    });

    // Listen for status updates
    // @ts-ignore
    window.electronAPI.onUpdateStatus((status: string) => {
      statusSpan.textContent = status;
      if (status.includes('Ready to install')) {
        updateBtn.classList.add('hidden');
        installBtn.classList.remove('hidden');
      } else if (status.includes('Checking') || status.includes('Downloading')) {
         updateBtn.disabled = true;
      } else {
         updateBtn.disabled = false;
         updateBtn.classList.remove('hidden');
         installBtn.classList.add('hidden');
      }
    });
  }
}

