export const ease = [0.22, 1, 0.36, 1] as const;

export const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.55, ease } },
    },
    stagger: {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.08 },
        },
    },
};

// export const variants = {
//     fadeUp: {
//         hidden: {opacity: 0, y: 18},
//         visible: {opacity: 1, y: 0, transition: {duration: 0.65, ease}},
//     },
//     fade: {
//         hidden: {opacity: 0},
//         visible: {opacity: 1, transition: {duration: 0.55, ease}},
//     },
//     stagger: {
//         hidden: {},
//         visible: {
//             transition: {staggerChildren: 0.08, delayChildren: 0.08},
//         },
//     },
// };
