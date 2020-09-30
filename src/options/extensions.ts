import { PERMISSION_DETAILS } from './permissions';

const showExtensionDetails = (): void => {
  const extensionListDiv = document.getElementById('extensions-list');
  const extensionsDetailsDiv = document.getElementById('extension-details');
  if (!extensionListDiv || !extensionsDetailsDiv) return;

  extensionListDiv.className = extensionListDiv.className.replace(/active-extensions-content/g, '');
  extensionsDetailsDiv.className += 'active-extensions-content';
};

const showExtensionsList = (): void => {
  const extensionListDiv = document.getElementById('extensions-list');
  const extensionsDetailsDiv = document.getElementById('extension-details');
  if (!extensionListDiv || !extensionsDetailsDiv) return;

  extensionsDetailsDiv.className = extensionsDetailsDiv.className.replace(/active-extensions-content/g, '');
  extensionListDiv.className += 'active-extensions-content';
};

const createExtensionDetailsDiv = (extension: chrome.management.ExtensionInfo): void => {
  const extensionDetailsBackButton = document.getElementById('extension-details-back-button');
  if (!extensionDetailsBackButton) return;
  extensionDetailsBackButton.onclick = (): void => showExtensionsList();

  const extensionDetailsIconContainer = document.getElementById('extension-details-icon');
  if (!extensionDetailsIconContainer) return;
  extensionDetailsIconContainer.querySelectorAll('*').forEach((el) => el.remove());
  const icon = extension.icons?.[0] ?? undefined;
  if (icon) {
    const extensionDetailsIcon = document.createElement('img');
    extensionDetailsIcon.className = 'extension-details-icon';
    extensionDetailsIcon.src = icon.url;
    extensionDetailsIconContainer.appendChild(extensionDetailsIcon);
  }

  const extensionDetailsName = document.getElementById('extension-details-name');
  if (!extensionDetailsName) return;
  extensionDetailsName.innerText = extension.name;

  const extensionDetailsDescription = document.getElementById('extension-details-description');
  if (!extensionDetailsDescription) return;
  extensionDetailsDescription.innerText = extension.description;

  const extensionDetailsUninstallButton = document.getElementById('extension-details-uninstall-button');
  if (!extensionDetailsUninstallButton) return;
  extensionDetailsUninstallButton.onclick = (): void => {
    chrome.management.uninstall(extension.id, { showConfirmDialog: true }, (): void => {
      window.location.reload();
    });
  };

  const extensionDetailsPermissionsDiv = document.getElementById('extension-details-body-permissions');
  if (!extensionDetailsPermissionsDiv) return;
  extensionDetailsPermissionsDiv.querySelectorAll('*').forEach((el) => el.remove());
  extension.permissions.forEach((permission) => {
    const extensionDetailsPermission = document.createElement('div');
    extensionDetailsPermission.className = 'extension-details-permission';
    const detail = PERMISSION_DETAILS[permission] ?? undefined;

    const extensionDetailsPermissionTitle = document.createElement('div');
    extensionDetailsPermissionTitle.className = 'extension-details-permission-title';
    extensionDetailsPermissionTitle.innerText = detail?.title ?? permission;
    extensionDetailsPermission.appendChild(extensionDetailsPermissionTitle);

    const extensionDetailsPermissionDescription = document.createElement('div');
    extensionDetailsPermissionDescription.className = 'extension-details-permission-description';
    extensionDetailsPermissionDescription.innerText = detail?.description ?? '-';
    extensionDetailsPermission.appendChild(extensionDetailsPermissionDescription);

    extensionDetailsPermissionsDiv.appendChild(extensionDetailsPermission);
  });

  showExtensionDetails();
};

const createExtensionListItemDiv = (extension: chrome.management.ExtensionInfo): HTMLDivElement => {
  const extensionListItemDiv = document.createElement('div');
  extensionListItemDiv.id = `extension-list-item-${extension.id}`;
  extensionListItemDiv.className = 'extension-list-item';
  extensionListItemDiv.onclick = (): void => {
    createExtensionDetailsDiv(extension);
  };

  const extensionListItemHeader = document.createElement('div');
  extensionListItemHeader.className = 'extension-list-item-header';
  extensionListItemDiv.appendChild(extensionListItemHeader);

  const icon = extension.icons?.[0] ?? undefined;
  if (icon) {
    const extensionListItemIcon = document.createElement('img');
    extensionListItemIcon.className = 'extension-list-item-icon';
    extensionListItemIcon.src = icon.url;
    extensionListItemHeader.appendChild(extensionListItemIcon);
  }

  const extensionListItemTitle = document.createElement('div');
  extensionListItemTitle.className = 'extension-list-item-title';
  extensionListItemTitle.innerText = extension.name;
  extensionListItemHeader.appendChild(extensionListItemTitle);

  const extensionListItemDescription = document.createElement('div');
  extensionListItemDescription.className = 'extension-list-item-description';
  extensionListItemDescription.innerText = extension.description;
  extensionListItemDiv.appendChild(extensionListItemDescription);

  const extensionListItemPermissionInfo = document.createElement('div');
  extensionListItemPermissionInfo.className = 'extension-list-item-permission-info';
  extensionListItemPermissionInfo.innerText = `Uses ${extension.permissions.length} permissions`;
  extensionListItemDiv.appendChild(extensionListItemPermissionInfo);
  return extensionListItemDiv;
};

const constructListItems = (): void => {
  const extensionListItemsDiv = document.getElementById('extensions-list-body');
  if (!extensionListItemsDiv) return;
  chrome.management.getAll((extensions) => {
    extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((extension) => {
        const extensionDiv = createExtensionListItemDiv(extension);
        extensionListItemsDiv.appendChild(extensionDiv);
      });
  });
};

export const constructExtensions = (): void => {
  constructListItems();
};
