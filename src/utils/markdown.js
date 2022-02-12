// It extracts headings from the given markdownText.
export const extractHeadingsFromMd = (
  markdownText,
  highestTargetHeadings = 1,
  lowestTargetHeadings = 6
) => {
  const headingRegex = new RegExp(
    `^#{${highestTargetHeadings},${lowestTargetHeadings}}\\s.+(\\n|\\r|\\r\\n)`,
    "gm"
  );
  return markdownText.match(headingRegex);
};

// Get the level of header
export const getLevel = (string) => {
  const level = string.split("#").length - 1;
  return level;
};

// Parse depths (header levels) to start from 0
export const parseDepths = (data) => {
  const lowestHeader = Math.min.apply(
    Math,
    data.map((o) => o.level)
  );

  const parsed = data.map((item) => {
    const depth = item.level - lowestHeader;

    return {
      ...item,
      depth,
    };
  });

  return parsed;
};

// Add chapter numbers to the array
export const addChapters = (data) => {
  const same = (str) => {
    if (str === "") {
      return (1).toString();
    } else {
      let arr = str.split(".");
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
      }

      arr[arr.length - 1] += 1;
      str = arr.join(".");
      return str;
    }
  };

  const low = (str, depth) => {
    let arr = str.split(".").slice(0, depth + 1);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseInt(arr[i]);
    }

    arr[depth] += 1;
    str = arr.join(".");
    return str;
  };

  let latest = "";
  let last = 0;

  const parsed = data.map((item) => {
    const { depth } = item;

    if (depth == last) {
      latest = same(latest);
    } else if (depth > last) {
      latest += ".1";
    } else {
      latest = low(latest, depth);
    }

    last = depth;

    return { ...item, chapter: latest };
  });

  return parsed;
};

// It removes # from the given string. And it shortens the string if its longer than "stringLimit".
export const createTitle = (string, stringLimit) => {
  const rawTitle = string.replace(/^#+\s/g, "").replaceAll("\n", "");

  if (rawTitle.length >= stringLimit)
    return `${rawTitle.slice(0, stringLimit)}..`;

  return rawTitle;
};

// Create a slug from text
export const createSlug = (text) => {
  const _text = text
    .toLowerCase()
    .replace(/\W/g, "-")
    .replace(/^-+|-+$/g, "");
  return _text;
};

export const dummyMarkdown = `
## Maker Summary

Maker is a financial service created for the Ethereum Blockchain in 2015. Specifically, it is a lending service that takes crypto and RWA as collateral, and provides a unique asset in return. This unique asset, called DAI, is a cryptocurrency made by Maker that is ensured to be pegged to the USD. Maker, backed by people who believed in the power of blockchain’s ability to host currency, wanted to combat volatility in what they believed to be the best way.

## MakerDAO Summary

MakerDAO is the organization that governs Maker. It uses a novel business structure, called a DAO. They are a DAO to take advantage of blockchain's decentralization.

#### Another Summary 1

This is a subheader which is part of MakerDAO Summary, try and navigate to this and it will work perfectly.

###### Another Sub Summary

This is a subheader which is part of Another Summary which is part of MakerDAO Summary, try and navigate to this and it will work perfectly.

#### Another Summary 2

This is a subheader which is part of MakerDAO Summary, try and navigate to this and it will work perfectly.

## Reasons to Learn

Learn because of these reasons..

## Getting Started

To get started learning, please check out some of our recommended beginner courses and material down below, or go explore our site on your own. We also provide a recommended beginner sequence on our right.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet posuere sem. Curabitur vitae massa lobortis mi finibus auctor. Donec ipsum diam, finibus nec quam vel, rutrum interdum nisl. Nullam at tellus purus. Vestibulum commodo enim eget lacus vestibulum vehicula. Mauris egestas viverra sodales. Aliquam vel turpis venenatis, eleifend ante in, rutrum massa.

In sit amet iaculis neque. Donec id nibh justo. Vestibulum lorem lectus, tempor nec consequat in, mattis eget est. Curabitur eget odio sed magna scelerisque ultricies in eget magna. Mauris sodales, tortor ut ullamcorper imperdiet, elit odio lobortis orci, a congue risus sem quis nunc. Aliquam dapibus ut sem eget aliquam. Cras pulvinar libero quis purus varius, eu volutpat lectus volutpat. Quisque nec odio in sem pellentesque laoreet. Phasellus at nibh eu ipsum congue molestie. Duis neque lorem, sollicitudin vel tortor in, tincidunt faucibus nulla. Integer facilisis vestibulum hendrerit. Proin luctus consectetur sem, vitae egestas magna rutrum ac.

Suspendisse fringilla augue ut pellentesque lobortis. Praesent velit libero, convallis ac sollicitudin vitae, congue malesuada nisl. Proin in erat ac lectus lacinia euismod. Sed consectetur accumsan dolor in iaculis. Phasellus congue leo in varius laoreet. Sed volutpat a sem ac gravida. Ut at risus sit amet arcu malesuada condimentum. Sed convallis neque ut nibh efficitur, nec bibendum augue lacinia. Donec pulvinar quam at est gravida, varius volutpat magna consequat.

Pellentesque dignissim sapien purus, porttitor elementum erat fermentum nec. Sed venenatis dui non sodales ullamcorper. Aliquam eu nisl sodales, consequat lorem in, euismod mi. Nullam pellentesque, nulla eu pulvinar luctus, ligula arcu imperdiet nibh, porta scelerisque diam diam vitae lacus. Curabitur nulla quam, molestie eu tellus eu, rutrum mattis purus. Aliquam ut feugiat urna. Mauris suscipit elementum turpis at vulputate. Morbi porttitor malesuada urna, nec semper lectus malesuada eget.

`;
