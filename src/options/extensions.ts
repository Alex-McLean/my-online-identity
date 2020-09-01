import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const createPermissionSpan = (
  extension: chrome.management.ExtensionInfo,
  permission: string,
  index: number
): HTMLSpanElement => {
  const lastPermission = extension.permissions.length === index + 1;
  const permissionSpan = document.createElement('span');
  permissionSpan.innerText = `${permission}${lastPermission ? '' : ', '}`;
  permissionSpan.id = `${extension.id}${index}`;

  tippy(permissionSpan, {
    content: `This is some interesting information about this permission: ${permission}`,
    arrow: true,
    duration: 100,
    maxWidth: 200,
  });

  return permissionSpan;
};

const createExtensionParagraph = (extension: chrome.management.ExtensionInfo): HTMLParagraphElement => {
  const extensionParagraph = document.createElement('p');
  extensionParagraph.id = extension.id;

  const extensionNameSpan = document.createElement('span');
  extensionNameSpan.innerText = `${extension.name}: `;
  extensionNameSpan.className = 'extension-name';
  extensionParagraph.appendChild(extensionNameSpan);

  extension.permissions.forEach((permission, index) => {
    const permissionSpan = createPermissionSpan(extension, permission, index);
    extensionParagraph.appendChild(permissionSpan);
  });

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
