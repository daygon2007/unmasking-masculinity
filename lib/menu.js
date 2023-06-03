import graphqlRequest from "./graphqlRequest";

export async function getMenu() {
    const query = {
        query: `
        query getMenu {
          menu(id: "menu-1", idType: SLUG) {
            name
            slug
            menuItems {
              nodes {
                uri
                label
                target
              }
            }
          }
        }
        `
    };
    const resJson = await graphqlRequest(query);
    const menu = resJson.data.menu;

    return menu;
}