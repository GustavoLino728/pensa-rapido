import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header () {
    return (
        <header className="grid grid-cols-3 items-center p-4">
            <div className="justify-self-start">
                <Link href="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Voltar
                </Link>
            </div>
            
            <div className="justify-self-center">
                <h3 className="text-3xl font-bold">Pensa Rápido</h3>
            </div>

            <div className="justify-self-end pr-4">
                <FontAwesomeIcon icon={faVolumeHigh} className="text-2xl" />
            </div>
        </header>
    );
}