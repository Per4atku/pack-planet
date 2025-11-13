export default ({ env }) => ({
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      importOnBootstrap: false,
      customTypes: [],
      excludedTypes: [],
      excludedConfig: [],
    },
  },
});
