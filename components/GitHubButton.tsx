import { IconBrandGithub } from '@tabler/icons-react';

interface GitHubButtonProps {
    className?: string;
}

export default function GitHubButton({ className }: GitHubButtonProps) {
    return (
        <div className={className}>
            <a
                href="https://github.com/TheDeadGPU/GlyphDrift"
                target="_blank"
                rel="noopener noreferrer"
            >
                <IconBrandGithub/>
            </a>
        </div>
    );
}