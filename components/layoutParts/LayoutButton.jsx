import Link from 'next/link';

export default function LayoutButton({ path, title }) {
  return (
    <Link href={path}>
      <a className="text-gray-400 hover:bg-yellow-50 h-24 p-10 cursor-pointer">
        {title}
      </a>
    </Link>
  );
}
