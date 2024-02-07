'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { env } from '@/env.mjs';
import {
  FacebookIcon,
  ForwardIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { convert } from 'html-to-text';

const SocialShare = ({ description }: { description: string }) => {
  const pathName = usePathname();
  const baseUrl = `${env.NEXT_PUBLIC_BASE_URL}${pathName}`;
  const text = convert(description);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-secondary rounded-full p-3">
          <ForwardIcon className="text-white w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" asChild>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}`}
            target="_blank"
          >
            <FacebookIcon className="w-5 h-5 text-secondary" />
            <span className="text-lightGray">Facebook</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" asChild>
          <Link
            href={`https://twitter.com/intent/tweet?url=${baseUrl}&text=${text}`}
            target="_blank"
          >
            <TwitterIcon className="w-5 h-5 text-secondary" />
            <span className="text-lightGray">Twitter</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" asChild>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}`}
            target="_blank"
          >
            <LinkedinIcon className="w-5 h-5 text-secondary" />
            <span className="text-lightGray">Linkedin</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
