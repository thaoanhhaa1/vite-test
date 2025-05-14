import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  // Phân tích nội dung để tạo mục lục
  useEffect(() => {
    // Đây là một cách đơn giản để phân tích các tiêu đề từ nội dung markdown
    // Trong thực tế, bạn sẽ cần một cách tiếp cận mạnh mẽ hơn
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-');
      
      items.push({ id, text, level });
    }
    
    setTocItems(items);
  }, [content]);
  
  // Theo dõi vị trí cuộn để highlight mục lục hiện tại
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);
      
      const headingPositions = headingElements.map(el => ({
        id: el!.id,
        position: el!.getBoundingClientRect().top
      }));
      
      const visibleHeadings = headingPositions.filter(
        ({ position }) => position < 200 && position > -200
      );
      
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);
  
  if (tocItems.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-light-100 dark:bg-dark-200 rounded-xl p-6 shadow-md"
    >
      <h3 className="text-lg font-bold mb-4 text-dark-300 dark:text-light-100 font-mono">
        Mục lục
      </h3>
      <nav>
        <ul className="space-y-2">
          {tocItems.map(item => (
            <li 
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 text-sm transition-colors ${
                  activeId === item.id
                    ? 'text-accent-blue dark:text-accent-pink font-medium'
                    : 'text-dark-200 dark:text-light-300 hover:text-accent-blue dark:hover:text-accent-pink'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default TableOfContents;