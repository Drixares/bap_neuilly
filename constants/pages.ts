export const TEAM = {
    name: "Made In Neuilly",
    logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345507/logo-01_kp2j8x.png",
};

export const ADMIN_PRINCIPAL_PAGES = [
    {
        title: "Tableau de bord",
        url: "/admin",
    },
    {
        title: "Artisans",
        url: "/admin/artisans",
    },
    {
        title: "Documents",
        url: "/admin/documents",
    },
    {
        title: "Demandes",
        url: "/admin/demandes",
    },
];

export const ADMIN_OTHER_PAGES = [
    {
        title: "Paramètres",
        url: "/admin/settings",
    },
    {
        title: "Centre d'aide",
        url: "/admin/help",
    },
];

export const ADMIN_PAGES_WITH_TITLE = [
    {
        title: "Principales",
        pages: ADMIN_PRINCIPAL_PAGES,
    },
    {
        title: "Autres",
        pages: ADMIN_OTHER_PAGES,
    },
];

export const ADMIN_PAGES = [...ADMIN_PRINCIPAL_PAGES, ...ADMIN_OTHER_PAGES];
