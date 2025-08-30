import type { Badge } from 'types/user'

// Demo badges for local UI testing only. Remove when real badges are wired.
export const DEMO_BADGES: Badge[] = [
    {
        name: 'Top Contributor',
        description: 'Recognized for outstanding contributions.',
        cssClass: 'fa-solid fa-crown',
        weight: 100,
    },
    {
        name: 'Bug Squasher',
        description: 'Closed 100+ issues across OWASP projects.',
        cssClass: 'fa-solid fa-bug',
        weight: 80,
    },
    {
        name: 'Docs Hero',
        description: 'Significant improvements to documentation.',
        cssClass: 'fa-solid fa-book',
        weight: 70,
    },
    {
        name: 'Community Mentor',
        description: 'Actively mentors new contributors.',
        cssClass: 'fa-solid fa-handshake-angle',
        weight: 90,
    },
    {
        name: 'Security Champion',
        description: 'Leads security best practices.',
        cssClass: 'fa-solid fa-shield-halved',
        weight: 95,
    },
    {
        name: 'Star Gazer',
        description: 'Starred many OWASP repositories.',
        cssClass: 'fa-solid fa-star',
        weight: 60,
    },
]
