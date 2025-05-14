import { motion } from 'framer-motion';

interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter: string;
  github: string;
}

interface AuthorInfoProps {
  author: Author;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-light-100 dark:bg-dark-200 rounded-xl p-6 shadow-md"
    >
      <div className="flex items-center mb-4">
        <img 
          src={author.avatar} 
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-accent-blue dark:border-accent-pink"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-dark-300 dark:text-light-100">
            {author.name}
          </h3>
          <div className="flex space-x-2 mt-1">
            <a 
              href={`https://twitter.com/${author.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue dark:text-accent-pink hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a 
              href={`https://github.com/${author.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="text-dark-200 dark:text-light-300 text-sm">
        {author.bio}
      </p>
    </motion.div>
  );
};

export default AuthorInfo;