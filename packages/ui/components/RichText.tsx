import { cn } from '@ui/lib/utils';
import DOMPurify from 'isomorphic-dompurify';

interface RichTextProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
}

const RichText = (props: RichTextProps) => {
  const { content, className, ...rest } = props;
  const cleanContent = DOMPurify.sanitize(content);

  return (
    <div
      {...rest}
      className={cn(
        'prose max-w-none dark:prose-invert text-muted-foreground',
        className
      )}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

export default RichText;
