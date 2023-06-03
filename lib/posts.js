import graphqlRequest from "./graphqlRequest"

export async function getPostList(endCursor = null) {
  const condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`;
    const query = {
        query : `
        query getAllPosts {
  posts(${condition}) {
    nodes {
      date
      slug
      title
      excerpt
      featuredImage {
        node {
          mediaDetails {
            height
            width
          }
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
        `
    }
    const resJson = await graphqlRequest(query);
    const allPosts = resJson.data.posts;

    return allPosts;
}


export async function getSinglePost(slug) {
  const query = {
    query: `
  query getSinglePost {
  post(id: "${slug}", idType: SLUG) {
    title(format: RENDERED)
    date
    excerpt(format: RENDERED)
    modified
    slug
    content(format: RENDERED)
    seo {
      fullHead
      metaRobotsNofollow
      metaRobotsNoindex
    }
    categories {
      nodes {
        slug
        name
      }
    }
  }
}
  `
  };
  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;

  return singlePost;
}

export async function getPostSlugs(){
  const query = {
    query: `
    query getPostSlugs {
  posts {
    nodes {
      slug
    }
  }
}
    `
  };
  const resJson = await graphqlRequest(query);
  const slugs = resJson.data.posts.nodes;

  return slugs;
}