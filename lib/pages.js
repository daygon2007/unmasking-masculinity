import graphqlRequest from "./graphqlRequest";

export async function getPageSlugs() {
    const query = {
        query: `
        query getPageSlugs {
  pages {
    nodes {
      slug
    }
  }
}
        `
    };
    const resJson = await graphqlRequest(query);
    const slugs = resJson.data.pages.nodes;

    return slugs;
}

export async function getSinglePage(slug) {
    const query = {
        query: `
        query getSinglePage {
  pages(where: {name: "${slug}"}) {
    nodes {
      title
      slug
      blocks {
        name
        dynamicContent
      }
      seo {
        fullHead
        metaRobotsNofollow
        metaRobotsNoindex
      }
    }
  }
}
        `
    };
    const resJson = await graphqlRequest(query);
    const pageData = resJson.data.pages.nodes[0];

    return pageData;
}

export async function getHomePage() {
    const query = {
        query: `
        query getSinglePage {
  pages(where: {name: "home"}) {
    nodes {
      title
      slug
      blocks {
        name
        dynamicContent
      }
      seo {
        fullHead
        metaRobotsNofollow
        metaRobotsNoindex
      }
    }
  }
}
        `
    };
    const resJson = await graphqlRequest(query);
    const pageData = resJson.data.pages.nodes[0];

    return pageData;
}

export async function getBlogPage() {
    const query = {
        query: `
        query getSinglePage {
  pages(where: {name: "blog"}) {
    nodes {
      title
      slug
      blocks {
        name
        dynamicContent
      }
      seo {
        fullHead
        metaRobotsNofollow
        metaRobotsNoindex
      }
    }
  }
}
        `
    };
    const resJson = await graphqlRequest(query);
    const pageData = resJson.data.pages.nodes[0];

    return pageData;
}

export async function getContactPage() {
  const query = {
    query: `
        query getSinglePage {
  pages(where: {name: "contact"}) {
    nodes {
      title
      slug
      blocks {
        name
        dynamicContent
      }
      seo {
        fullHead
        metaRobotsNofollow
        metaRobotsNoindex
      }
    }
  }
}
        `
  };
  const resJson = await graphqlRequest(query);
  const pageData = resJson.data.pages.nodes[0];

  return pageData;
}