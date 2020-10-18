/**
 * Construct all DOM elements for the Extensions page of the options interface
 */

import { PERMISSION_DETAILS } from './permissions';

/**
 * Adds and removes the relevant CSS classes to show the extension details view
 */
const showExtensionDetails = (): void => {
  const extensionListDiv = document.getElementById('extensions-list');
  const extensionsDetailsDiv = document.getElementById('extension-details');
  if (!extensionListDiv || !extensionsDetailsDiv) return;

  extensionListDiv.className = extensionListDiv.className.replace(/active-extensions-content/g, '');
  extensionsDetailsDiv.className += ' active-extensions-content';
};

/**
 * Adds and removes the relevant CSS classes to show the extension list view
 */
const showExtensionsList = (): void => {
  const extensionListDiv = document.getElementById('extensions-list');
  const extensionsDetailsDiv = document.getElementById('extension-details');
  if (!extensionListDiv || !extensionsDetailsDiv) return;

  extensionsDetailsDiv.className = extensionsDetailsDiv.className.replace(/active-extensions-content/g, '');
  extensionListDiv.className += ' active-extensions-content';
};

/**
 * Create a detailed extension view in the DOM for the given extension
 */
const createExtensionDetailsDiv = (extension: chrome.management.ExtensionInfo): void => {
  // Create the back button functionality for the details view
  const extensionDetailsBackButton = document.getElementById('extension-details-back-button');
  if (!extensionDetailsBackButton) return;
  // Set back button to return to the extensions list
  extensionDetailsBackButton.onclick = (): void => showExtensionsList();

  // Remove any existing icons from the extension details view from previously shown extensions
  const extensionDetailsIconContainer = document.getElementById('extension-details-icon');
  if (!extensionDetailsIconContainer) return;
  extensionDetailsIconContainer.querySelectorAll('*').forEach((el) => el.remove());

  // Add current extension's icon to the DOM, if it has one registered
  const icon = extension.icons?.[0] ?? undefined;
  if (icon) {
    const extensionDetailsIcon = document.createElement('img');
    extensionDetailsIcon.className = 'extension-details-icon';
    extensionDetailsIcon.src = icon.url;
    extensionDetailsIconContainer.appendChild(extensionDetailsIcon);
  }

  // Set the extension details name
  const extensionDetailsName = document.getElementById('extension-details-name');
  if (!extensionDetailsName) return;
  extensionDetailsName.innerText = extension.name;

  // Set the extension details description
  const extensionDetailsDescription = document.getElementById('extension-details-description');
  if (!extensionDetailsDescription) return;
  extensionDetailsDescription.innerText = extension.description;

  // Set the functionality of the uninstall button to that of the given extension
  const extensionDetailsUninstallButton = document.getElementById('extension-details-uninstall-button');
  if (!extensionDetailsUninstallButton) return;
  // Execute the chrome management uninstall call for the given extension onclick, use confirmation dialog
  extensionDetailsUninstallButton.onclick = (): void => {
    chrome.management.uninstall(extension.id, { showConfirmDialog: true }, (): void => {
      window.location.reload();
    });
  };

  // Remove any existing permissions from the extension details view from previously shown extensions
  const extensionDetailsPermissionsDiv = document.getElementById('extension-details-body-permissions');
  if (!extensionDetailsPermissionsDiv) return;
  extensionDetailsPermissionsDiv.querySelectorAll('*').forEach((el) => el.remove());

  // Add a list item for each of the extensions permissions
  extension.permissions.forEach((permission) => {
    const extensionDetailsPermission = document.createElement('div');
    extensionDetailsPermission.className = 'extension-details-permission';

    // Lookup details about the permission
    const detail = PERMISSION_DETAILS[permission] ?? undefined;

    // Add the permission's name, either from lookup or as-is
    const extensionDetailsPermissionTitle = document.createElement('div');
    extensionDetailsPermissionTitle.className = 'extension-details-permission-title';
    extensionDetailsPermissionTitle.innerText = detail?.title ?? permission;
    extensionDetailsPermission.appendChild(extensionDetailsPermissionTitle);

    // Add the permission's description, either from lookup or leave empty
    const extensionDetailsPermissionDescription = document.createElement('div');
    extensionDetailsPermissionDescription.className = 'extension-details-permission-description';
    extensionDetailsPermissionDescription.innerText = detail?.description ?? '-';
    extensionDetailsPermission.appendChild(extensionDetailsPermissionDescription);

    // Append the permission item to the DOM
    extensionDetailsPermissionsDiv.appendChild(extensionDetailsPermission);
  });

  // Show the detailed extension view
  showExtensionDetails();
};

/**
 * Creates a list item element for the given extension
 */
const createExtensionListItem = (extension: chrome.management.ExtensionInfo): HTMLDivElement => {
  // Create container element
  const extensionListItemDiv = document.createElement('div');
  extensionListItemDiv.id = `extension-list-item-${extension.id}`;
  extensionListItemDiv.className = 'extension-list-item';
  // Set onclick handler for container element to create the extension details view
  extensionListItemDiv.onclick = (): void => {
    createExtensionDetailsDiv(extension);
  };

  // Create extension header and append to container
  const extensionListItemHeader = document.createElement('div');
  extensionListItemHeader.className = 'extension-list-item-header';
  extensionListItemDiv.appendChild(extensionListItemHeader);

  // Add the extension's icon to the header, if it has one registered
  const icon = extension.icons?.[0] ?? undefined;
  if (icon) {
    const extensionListItemIcon = document.createElement('img');
    extensionListItemIcon.className = 'extension-list-item-icon';
    extensionListItemIcon.src = icon.url;
    extensionListItemHeader.appendChild(extensionListItemIcon);
  }

  // Add the extension's title to the header
  const extensionListItemTitle = document.createElement('div');
  extensionListItemTitle.className = 'extension-list-item-title';
  extensionListItemTitle.innerText = extension.name;
  extensionListItemHeader.appendChild(extensionListItemTitle);

  // Add the extension's description to the container
  const extensionListItemDescription = document.createElement('div');
  extensionListItemDescription.className = 'extension-list-item-description';
  extensionListItemDescription.innerText = extension.description;
  extensionListItemDiv.appendChild(extensionListItemDescription);

  // Add the extension's permission count to the container
  const extensionListItemPermissionInfo = document.createElement('div');
  extensionListItemPermissionInfo.className = 'extension-list-item-permission-info';
  extensionListItemPermissionInfo.innerText = `Uses ${extension.permissions.length} permission${
    extension.permissions.length === 1 ? '' : 's'
  }`;
  extensionListItemDiv.appendChild(extensionListItemPermissionInfo);

  if (extension.permissions.length > 0) {
    const extensionListItemPermissionExpander = document.createElement('div');
    extensionListItemPermissionExpander.className = 'extension-list-item-permission-expander';
    extensionListItemPermissionExpander.innerText = '+';
    extensionListItemPermissionInfo.appendChild(extensionListItemPermissionExpander);

    const extensionListItemPermissionList = document.createElement('div');
    extensionListItemPermissionList.className = 'extension-list-item-permission-list';
    extensionListItemPermissionList.classList.add('hidden');
    extensionListItemPermissionList.innerText = extension.permissions
      .map((permission) => PERMISSION_DETAILS[permission]?.title ?? permission)
      .join('\n');
    extensionListItemDiv.appendChild(extensionListItemPermissionList);

    extensionListItemPermissionExpander.onclick = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();
      extensionListItemPermissionList.classList.toggle('hidden');
      if (extensionListItemPermissionList.classList.contains('hidden')) {
        extensionListItemPermissionExpander.innerText = '+';
      } else {
        extensionListItemPermissionExpander.innerText = '-';
      }
    };
  }

  return extensionListItemDiv;
};

/**
 * Construct list items for all extensions installed by the user
 */
const constructListItems = (): void => {
  // Get the container DOM element for list items
  const extensionListItemsDiv = document.getElementById('extensions-list-body');
  if (!extensionListItemsDiv) return;

  // Get all installed extensions, sort them alphabetically by name, and create list item
  chrome.management.getAll((extensions) => {
    extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((extension) => {
        const extensionDiv = createExtensionListItem(extension);
        extensionListItemsDiv.appendChild(extensionDiv);
      });
  });
};

/**
 * General entrypoint to this script, creates all extension elements
 */
export const constructExtensions = (): void => {
  constructListItems();
};
