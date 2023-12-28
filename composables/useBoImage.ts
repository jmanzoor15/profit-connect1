// composable
export default () => {
  const config = useRuntimeConfig();
  const imageUrl = config.public.imageUrl;

  const getUrl = (url: string) => {
    return `${imageUrl}/${url}`;
  };

  return {
    getUrl,
  };
};
