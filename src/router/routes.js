const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
    children: [
      {
        path: "/",
        redirect: "/cat"
      },
      {
        path: "/cat",
        name: "cat",
        component: () => import("pages/Index.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
