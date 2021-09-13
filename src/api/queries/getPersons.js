export const query = `
{
  personCollection {
    items {
      name
      email
      portrait {url}
    }
  }
}
`;