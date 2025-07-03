export default function LoginPage() {
  return (
    <main className="text-white p-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col space-y-4">
        <input type="email" placeholder="Email" className="p-2 bg-gray-800 rounded" />
        <input type="password" placeholder="Senha" className="p-2 bg-gray-800 rounded" />
        <button className="bg-bunker-red p-2 rounded">Entrar</button>
      </form>
    </main>
  )
}
