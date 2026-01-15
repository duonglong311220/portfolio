import {motion, useReducedMotion} from "framer-motion";
import {ease} from "../lib/animation";
type SkillBarProps = {
    name: string;
    level: number;
};

export default function SkillBar ({name, level}: SkillBarProps) {
    const reduce = useReducedMotion();
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{level}%</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <motion.div
                    initial={reduce ? {width: `${level}%`} : {width: 0}}
                    whileInView={{width: `${level}%`}}
                    viewport={{once: true, amount: 0.6}}
                    transition={{duration: 0.9, ease}}
                    className="h-full rounded-full bg-zinc-900 dark:bg-white"
                />
            </div>
        </div>
    );
}
