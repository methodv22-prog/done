// shopify-api.js
const storeDomain = "ekabjq-ts.myshopify.com";
const storefrontAccessToken = "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";

async function fetchProducts(limit = 10) {
  const query = `
    {
      products(first: ${limit}) {
        edges {
          node {
            id
            title
            description
            featuredImage { url }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }`;

  const response = await fetch(`https://${storeDomain}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  return data.data.products.edges;
}
