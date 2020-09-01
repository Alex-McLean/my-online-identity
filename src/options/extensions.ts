import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const createPermissionListItem = (extension: chrome.management.ExtensionInfo, permission: string): HTMLLIElement => {
  const permissionListItem = document.createElement('li');
  permissionListItem.innerText = permission;
  permissionListItem.id = `${extension.id}${permission}`;

  tippy(permissionListItem, {
    content: `This is some interesting information about this permission: ${permission}`,
    duration: 100,
    maxWidth: 200,
    placement: 'top-start',
    arrow: true,
    theme: 'moi',
  });

  return permissionListItem;
};

const createExtensionParagraph = (extension: chrome.management.ExtensionInfo): HTMLParagraphElement => {
  const extensionParagraph = document.createElement('p');
  extensionParagraph.id = extension.id;

  const extensionNameSpan = document.createElement('span');
  extensionNameSpan.innerText = `${extension.name}`;
  extensionNameSpan.className = 'extension-name';
  extensionParagraph.appendChild(extensionNameSpan);

  if (!extension.permissions.length) return extensionParagraph;

  const permissionsList = document.createElement('ul');

  extension.permissions.forEach((permission) => {
    const permissionListItem = createPermissionListItem(extension, permission);
    permissionsList.appendChild(permissionListItem);
  });

  extensionParagraph.appendChild(permissionsList);
  return extensionParagraph;
};

export const constructExtensions = (): void => {
  const extensionsDiv = document.getElementById('extensionsDiv');
  chrome.management.getAll((extensions) => {
    extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((extension) => {
        const extensionParagraph = createExtensionParagraph(extension);
        extensionsDiv?.appendChild(extensionParagraph);
      });
  });
};
