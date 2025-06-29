"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Download, ArrowBigLeftDash, ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_PAGES = 25;

export default function NooraniQaidaClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const imgParam = searchParams.get("img");
    const imgNum = imgParam && !isNaN(Number(imgParam)) ? Number(imgParam) : 1;
    const imgSrc = `/arabic-noorani-qaida/${imgNum}.jpg`;

    const goToPage = (page) => {
        if (page >= 1 && page <= TOTAL_PAGES) {
            router.push(`/learn-quran/noorani-qaida?img=${page}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-5">
            <div className="mb-5 w-full max-w-2xl flex justify-between items-center">
                <Link href="/learn-quran" className="bg-dark text-white px-4 py-2 text-xs rounded hover:bg-extra-dark transition flex items-center gap-3">
                    <ArrowBigLeftDash size={14}/> Back to List
                </Link>
                <Link
                    href={imgSrc}
                    download={`Noorani-Qaida-Page-${imgNum}.jpg`}
                    className="bg-dark text-white px-4 py-2 text-xs rounded hover:bg-extra-dark transition flex items-center gap-3"
                >
                    <Download size={14} /> Download Image
                </Link>
            </div>
            <div className="w-full max-w-2xl border rounded shadow-lg bg-gray-50 flex flex-col items-center">
                <Image
                    src={imgSrc}
                    alt={`Noorani Qaida Page ${imgNum}`}
                    width={600}
                    height={850}
                    className="object-contain w-full h-auto rounded"
                    priority
                />
                <div className="flex items-center justify-center gap-4 my-4">
                    <button
                        onClick={() => goToPage(imgNum - 1)}
                        disabled={imgNum <= 1}
                        className={`p-2 rounded-full border transition ${imgNum <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-center text-sm text-gray-500 select-none">
                        Page {imgNum} of {TOTAL_PAGES}
                    </span>
                    <button
                        onClick={() => goToPage(imgNum + 1)}
                        disabled={imgNum >= TOTAL_PAGES}
                        className={`p-2 rounded-full border transition ${imgNum >= TOTAL_PAGES ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
                        aria-label="Next Page"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}