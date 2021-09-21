module.exports = {
    devServer: {
        host: "testspacecompany.exileng.com",
        public: "testspacecompany.exileng.com",
    },
  publicPath: process.env.NODE_ENV ==='production'
  ? '/NGSpaceCompany/'
  : '/'
};
