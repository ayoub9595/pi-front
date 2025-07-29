export const navigationData = {
    ADMIN: [
        {
            id: "equipement",
            title: "Équipement",
            isToggleable: true,
            subLinks: [
                { to: "/home", label: "Ajouter équipement" },
                { to: "/home/equipements", label: "Liste des équipements" }
            ]
        },
        {
            id: "affectation",
            title: "Affectation",
            isToggleable: true,
            subLinks: [
                { to: "/home/affectations", label: "Liste des affectations" },
                { to: "/home/affectations/create", label: "Créer une affectation" }
            ]
        },
        {
            id: "reclamation",
            title: "Réclamation",
            isToggleable: true,
            subLinks: [
                { to: "/home/reclamations", label: "Liste des réclamations" }
            ]
        }
    ],

    UTILISATEUR: [
        {
            id: "affectation",
            title: "Affectation",
            isToggleable: true,
            subLinks: [
                { to: "/home/affectations", label: "Mes affectations" }
            ]
        },
        {
            id: "reclamation",
            title: "Réclamation",
            isToggleable: true,
            subLinks: [
                { to: "/home/reclamations/create", label: "Faire une réclamation" },
                { to: "/home/reclamations", label: "Mes réclamations" }
            ]
        }
    ]
};
