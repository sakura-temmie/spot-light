import LayoutNotLogin from "../components/layoutParts/LayoutNotLogin";
import Link from "next/link";

export default function Index() {
  return (
    <LayoutNotLogin title="Spotlight">
      <div className="w-64">
        <Link href="/login" passHref>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            ログイン
          </button>
        </Link>
        <Link href="/register/theater" passHref>
          <button
            type="submit"
            className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            劇場関係者の方
          </button>
        </Link>
        <Link href="/register/director" passHref>
          <button
            type="submit"
            className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            演出家の方
          </button>
        </Link>
      </div>
    </LayoutNotLogin>
  );
}
