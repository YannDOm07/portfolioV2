

export const TechIcon = ({ name, className = "w-10 h-10" }: { name: string, className?: string }) => {
  // Map internal names to Devicon slugs
  // Pattern: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[slug]/[slug]-[type].svg
  const iconMap: Record<string, string> = {
    "JavaScript": "javascript/javascript-original",
    "TypeScript": "typescript/typescript-original",
    "Python": "python/python-original",
    "HTML/CSS": "html5/html5-original", // Showing HTML5 as primary
    "React": "react/react-original",
    "React Native": "react/react-original", // Uses React logo
    "Node.js": "nodejs/nodejs-original",
    "Next.js": "nextjs/nextjs-original", // Might need white version for dark mode? Check rendering.
    "Tailwind": "tailwindcss/tailwindcss-original",
    "Firebase": "firebase/firebase-plain",
    "PostgreSQL": "postgresql/postgresql-original",
    "MySQL": "mysql/mysql-original",
    "AWS": "amazonwebservices/amazonwebservices-original-wordmark",
    "Git": "git/git-original",
    "Docker": "docker/docker-original",
    "Figma": "figma/figma-original",
    "VS Code": "vscode/vscode-original",
    "Machine Learning": "tensorflow/tensorflow-original", // Using TensorFlow as representative
    "Deep Learning": "pytorch/pytorch-original", // Using PyTorch as representative
  };

  const slug = iconMap[name];

  if (!slug) {
    return <span className="text-xs">{name}</span>;
  }

  return (
    <img 
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`}
      alt={`${name} icon`} 
      className={className}
    />
  );
};
