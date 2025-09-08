'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import ResumeCTA from './ResumeCTA';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  ResumeCTA,
};

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}
