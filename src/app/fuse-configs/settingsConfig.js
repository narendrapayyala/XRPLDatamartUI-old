const settingsConfig = {
  layout: {
    style: 'layout1', // layout1 layout2 layout3
    config: {
      navbar: {
        display: true,
        style: 'style-2',
        // folded: false,
        // position: 'left',
      },
      toolbar: {
        display: false,
      },
      footer: {
        display: false,
      },
    },
  },
  customScrollbars: true,
  direction: 'ltr', // rtl, ltr
  theme: {
    main: 'custom',
    navbar: 'custom',
    toolbar: 'custom',
    footer: 'custom',
  },
};

export default settingsConfig;
