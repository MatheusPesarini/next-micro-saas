import Link from "next/link";

export default function Header() {
	return (
		<header className="flex py-2 px-4 bg-gray-800 text-white">
			<div className="flex items-center justify-between w-full max-w-7xl mx-auto">
				<h1>Teste</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href={"/register"}>Cadastro</Link>
            </li>
          </ul>
        </nav>
			</div>
		</header>
	);
}
