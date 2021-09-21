module.exports = {
  devServer: {
    host: "localhost",
    public: "localhost",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/NGSpaceCompany/" : "/",
};
