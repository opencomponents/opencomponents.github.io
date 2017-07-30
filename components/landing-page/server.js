export const data = (context, callback) => {
  const { staticPath } = context;
  callback(null, {
    staticPath
  });
};
