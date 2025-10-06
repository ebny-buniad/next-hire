import { Target, TrendingUp, Search, FileUser, MessageSquareMore, Award, Users, ChartNoAxesCombined, ShieldCheck, Clock, Briefcase } from 'lucide-react';

const jobSeekerFeatures = [
    {
        title: "Smart Job Matching",
        description: "AI-powered algorithm matches you with relevant opportunities based on your skills and preferences.",
        icon: Search
    },
    {
        title: "Resume Builder",
        description: "Create professional resumes with our intuitive builder and templates designed by experts.",
        icon: FileUser
    },
    {
        title: "Direct Communication",
        description: "Connect directly with hiring managers and recruiters through our secure messaging platform.",
        icon: MessageSquareMore
    },
    {
        title: "Skill Assessment",
        description: "Showcase your abilities with verified skill tests and earn badges that employers trust platform.",
        icon: Award
    },
];



const employerFeatures = [
    {
        title: "Talent Pool Access",
        description: "Access our vast database of pre-screened candidates and find the perfect fit for your team.",
        icon: Users
    },
    {
        title: "Analytics Dashboard",
        description: "Track your hiring performance with detailed analytics and insights on candidate engagement.",
        icon: ChartNoAxesCombined
    },
    {
        title: "Verified Candidates",
        description: "All candidates undergo background verification to ensure you're hiring trustworthy professionals.",
        icon: ShieldCheck
    },
    {
        title: "Quick Hiring",
        description: "Streamlined hiring process reduces time-to-hire by 60% with automated screening tools.",
        icon: Clock
    },
];

const analyticsData = [
    {
        icon: Users,
        number: '1.4M+',
        text: 'Active Users',
        percent: '+15%'
    },
    {
        icon: Briefcase,
        number: '120K+',
        text: 'Jobs Posted',
        percent: '+25%'
    },
    {
        icon: Target,
        number: '96K+',
        text: 'Successful Hires',
        percent: '+16%'
    },
    {
        icon: TrendingUp,
        number: '94%',
        text: 'Match Rate',
        percent: '+39%'
    },
]

export { jobSeekerFeatures, employerFeatures, analyticsData };
