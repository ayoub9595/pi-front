export const navigationData = {
    ADMIN: [
        {
            id: 'equipement',
            title: 'Équipement',
            icon: '🔧',
            isToggleable: true,
            subLinks: [
                {
                    to: '/home',
                    label: 'Ajouter équipement',
                    icon: '➕'
                },
                {
                    to: '/home/equipements',
                    label: 'Liste des équipements',
                    icon: '📋'
                }
            ]
        },
        {
            id: 'affectation',
            title: 'Affectation',
            icon: '📦',
            isToggleable: true,
            subLinks: [
                {
                    to: '/home/affectations',
                    label: 'Liste des affectations',
                    icon: '📋'
                },
                {
                    to: '/home/affectations/create',
                    label: 'Créer une affectation',
                    icon: '➕'
                }
            ]
        }
    ],
    UTILISATEUR: [
        {
            id: 'affectation',
            title: 'Affectation',
            icon: '📦',
            isToggleable: true,
            subLinks: [
                {
                    to: '/home/affectations',
                    label: 'Mes affectations',
                    icon: '📋'
                }
            ]
        }
    ]
};