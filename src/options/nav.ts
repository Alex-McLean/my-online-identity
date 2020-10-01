/**
 * Construction script for the side navigation elements present in the options interface
 */

/**
 * Nav items to be displayed in the side navigation bar
 */
interface CreateNavItemArgs {
  navItemId: string;
  contentId: string;
}
const NAV_ITEMS: CreateNavItemArgs[] = [
  {
    navItemId: 'privacy-nav-item',
    contentId: 'privacy',
  },
  {
    navItemId: 'extensions-nav-item',
    contentId: 'extensions',
  },
  {
    navItemId: 'settings-nav-item',
    contentId: 'settings',
  },
];

/**
 * Create an item in the side navigation bar based on the given input
 * Input data type ensures that nav items are correctly linked to the main content to be displayed
 */
const createNavItem = (args: CreateNavItemArgs): void => {
  // Get the navigation item from the DOM
  const navItem = document.getElementById(args.navItemId);
  if (!navItem) return;

  // Set the nav item's onclick listener
  navItem.onclick = (): void => {
    // Remove the active status from any active main content
    const activeContentItems = document.getElementsByClassName('active-content');
    for (const activeContentItem of Array.from(activeContentItems)) {
      activeContentItem.className = activeContentItem.className.replace(/active-content/g, '');
    }

    // Set the relevant main content as active
    const contentItem = document.getElementById(args.contentId);
    if (!contentItem) return;
    contentItem.className += ' active-content';

    // Remove the active status from any active nav items
    const activeNavItems = document.getElementsByClassName('active-nav-item');
    for (const activeNavItem of Array.from(activeNavItems)) {
      activeNavItem.className = activeNavItem.className.replace(/active-nav-item/g, '');
    }

    // Set the relevant nav item as active
    navItem.className += ' active-nav-item';
  };
};

/**
 * General entrypoint to this script, creates all registered nav items
 */
export const constructNav = (): void => {
  NAV_ITEMS.forEach((item) => void createNavItem(item));
};
