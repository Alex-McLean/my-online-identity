interface CreateNavItemArgs {
  navItemId: string;
  contentId: string;
}
const createNavItem = (args: CreateNavItemArgs): void => {
  const navItem = document.getElementById(args.navItemId);
  if (!navItem) return;

  navItem.onclick = (): void => {
    const activeContentItems = document.getElementsByClassName('active-content');
    for (const activeContentItem of Array.from(activeContentItems)) {
      activeContentItem.className = activeContentItem.className.replace(/active-content/g, '');
    }

    const contentItem = document.getElementById(args.contentId);
    if (!contentItem) return;
    contentItem.className += ' active-content';

    const activeNavItems = document.getElementsByClassName('active-nav-item');
    for (const activeNavItem of Array.from(activeNavItems)) {
      activeNavItem.className = activeNavItem.className.replace(/active-nav-item/g, '');
    }

    navItem.className += ' active-nav-item';
  };
};

export const constructNav = (): void => {
  createNavItem({
    navItemId: 'privacy-nav-item',
    contentId: 'privacy',
  });

  createNavItem({
    navItemId: 'extensions-nav-item',
    contentId: 'extensions',
  });

  createNavItem({
    navItemId: 'settings-nav-item',
    contentId: 'settings',
  });
};
