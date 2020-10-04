/**
 * Determine whether or not a given test URL string matches a given host list
 */
export const matchesRegexList = (list: string[], test: URL): boolean => {
  // Attempt to find an item in the host list that matches the given URL string
  return !!list.find((listItem) => {
    // Host list items beginning and ending with '/' should be treated as regular expressions
    if (listItem.startsWith('/') && listItem.endsWith('/')) {
      const regExp = new RegExp(listItem);
      return regExp.exec(test.toString());
    }

    // Finally, check for the given list item within the URL string
    return test.toString().includes(listItem);
  });
};
