import setLanguage from "next-translate/setLanguage";

//Change App Language
export const handleLanguageChange = async (lang, router, pathname) => {
  await setLanguage(lang);
  if (router && pathname) {
    await router.replace(pathname, pathname, { locale: lang });
  }

  return null;
};

export const flattenChildren = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

export const isArrayEqual = (array1, array2) => {
  if (typeof array1 !== "object" || typeof array2 !== "object") return false;

  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }
      return false;
    });
  }
  return false;
};

// buildGithubPdfLink("tpn", "pdfs", "master", "AMD - CPUID.pdf")
export const buildGithubPdfLink = (user, repo, branch, pathToFile) => {
  const _path = encodeURI(pathToFile);
  const baseGithubLink = `https://github.com/${user}/${repo}/raw/${branch}/${_path}`;
  const docsLink = `https://docs.google.com/viewer?url=${baseGithubLink}&embedded=true`;

  return docsLink;
};