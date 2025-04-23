const coverToURL = (coverName: string) =>
  coverName ? `${process.env.BASE_URL}/images/covers/${coverName}` : "";

export { coverToURL };
