interface TagBadgeProps {
    tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
    // Hàm để xác định màu sắc dựa trên tag
    const getTagColor = (tag: string) => {
        const colors = {
            React: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            TypeScript:
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            JavaScript:
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Node.js':
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            CSS: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
            HTML: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            Performance:
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            Tutorial:
                'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
            Hooks: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            Generic:
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        };

        return (
            colors[tag as keyof typeof colors] ||
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        );
    };

    return (
        <a
            href={`/tag/${tag.toLowerCase()}`}
            className={`inline-block px-2 py-1 text-xs font-medium rounded ${getTagColor(
                tag,
            )} hover:opacity-90 transition-opacity`}
        >
            {tag}
        </a>
    );
};

export default TagBadge;
