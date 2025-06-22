// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "See below for my CV, also available for pdf download.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-neural-net-optimization-part-3-pytorch-and-pytorch-lightning",
        
          title: "Neural Net Optimization, Part 3 — PyTorch and PyTorch Lightning",
        
        description: "The third in a four-part series on neural network optimization, focusing on PyTorch fundamentals, abstraction with PyTorch Lightning, and the ongoing challenge of hyperparameter tuning.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ml-levels-pt-three/";
          
        },
      },{id: "post-neural-net-optimization-part-2-pytorch-writ-small",
        
          title: "Neural Net Optimization, Part 2 — PyTorch Writ Small",
        
        description: "The second in a four-part series on neural network optimization, focusing on PyTorch fundamentals, and how at a fundemntal level how pytorch is implemented on a per neruon level.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ml-levels-pt-two/";
          
        },
      },{id: "post-neural-net-optimization-part-1-the-computational-graph",
        
          title: "Neural Net Optimization, Part 1 — The Computational Graph",
        
        description: "The first in a four-part series exploring neural network optimization, starting from scratch with a toy computational graph and building up to scalable, practical ML systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ml-levels-pt-one/";
          
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
