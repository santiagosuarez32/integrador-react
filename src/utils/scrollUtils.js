export const scrollToCategory = (categoryFilterRef) => {
  if (categoryFilterRef.current) {
    categoryFilterRef.current.scrollIntoView({ behavior: "smooth" });
  }
};
