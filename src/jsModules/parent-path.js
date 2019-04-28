export default (scope) => {
  const allPaths = scope.$route.matched;
  return (allPaths.length > 2) ? (allPaths[allPaths.length - 2].path) : '';
}